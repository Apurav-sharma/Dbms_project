import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // console.log(req);
        const { user_id, phone, payment_method, amount, upi_pin, card_pin } = await req.json();


        // console.log(user_id, phone, payment_method, amount, upi_pin, card_pin);

        if (!user_id || !phone || !amount || !payment_method || (!upi_pin && !card_pin)) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const merchant_id = (await db.query("select user_id from user where phone = ?", [phone]))[0][0].user_id;
        // console.log(merchant_id)

        if (!merchant_id) {
            return NextResponse.json({ message: "Merchant not found" }, { status: 404 });
        }

        let userBalance = 0;

        if (payment_method === "upi") {
            const [upiResult] = await db.query("SELECT PIN FROM upi WHERE User_ID = ?", [user_id]);
            console.log(upiResult);
            if (upiResult.length === 0 || upiResult[0].PIN !== upi_pin) {
                return NextResponse.json({ message: "Invalid UPI PIN" }, { status: 400 });
            }
            userBalance = (await db.query("SELECT Balance FROM upi WHERE User_ID = ?", [user_id]))[0][0].Balance;
            console.log(userBalance)

        } else if (payment_method === "card") {
            const [cardResult] = (await connection.query("SELECT PIN FROM card WHERE User_ID = ?", [user_id]));
            if (cardResult.length === 0 || cardResult[0].PIN !== card_pin) {
                return NextResponse.json({ message: "Invalid Card PIN" }, { status: 400 });
            }

            userBalance = (await db.query("select balance from bank where user_id = ?", [user_id]))[0].balance;

        } else if (payment_method === "wallet") {
            if (userBalance < amount) {
                return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
            }
            userBalance = (await db.query("select balance from wallet where user_id = ?", [user_id]))[0].balance;

            try {
                await db.query("UPDATE wallet SET Balance = Balance - ? WHERE User_ID = ?", [amount, user_id]);
                await connection.query("UPDATE wallet SET Balance = Balance + ? WHERE User_ID = ?", [amount, merchant_id]);

            } catch (err) {
                return NextResponse.json({ message: "Error updating wallet balance" }, { status: 500 });
            }
            userBalance
        } else {
            return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
        }

        const insertTransactionQuery = `
            INSERT INTO transaction (User_ID, Merchant_ID, Payment_Method, Amount, Status) 
            VALUES (?, ?, ?, ?, 'Success')
        `;
        const [transactionResult] = await db.query(insertTransactionQuery, [user_id, merchant_id, payment_method, amount]);


        return NextResponse.json({
            message: "Transaction successful",
            transaction_id: transactionResult.insertId
        }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
    }
}


export async function GET(req) {
    try {

        const { upi_id } = await req.json();

        if (!upi_id) {
            return NextResponse(JSON.stringify({ message: "Make UPI ID first" }), { status: 400 });
        }

        const res = await db.query("select * from upi where upi_id = ?", [upi_id]);

        return NextResponse.json(res, { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
}