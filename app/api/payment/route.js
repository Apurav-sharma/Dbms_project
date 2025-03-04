import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { user_id, phone, payment_method, amount, upi_pin, card_pin } = await req.json();

        if (!user_id || !phone || !amount || !payment_method || (!upi_pin && !card_pin)) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const [merchantResult] = await db.query("SELECT user_id FROM user WHERE phone = ?", [phone]);
        if (merchantResult.length === 0) {
            return NextResponse.json({ message: "Merchant not found" }, { status: 404 });
        }
        const merchant_id = merchantResult[0].user_id;

        let userBalance = 0;

        if (payment_method === "upi") {
            const [upiResult] = await db.query("SELECT PIN FROM upi WHERE User_ID = ?", [user_id]);
            if (upiResult.length === 0 || upiResult[0].PIN !== upi_pin) {
                return NextResponse.json({ message: "Invalid UPI PIN" }, { status: 400 });
            }
            const [balanceResult] = await db.query("SELECT balance FROM bank WHERE User_ID = ?", [user_id]);
            if (balanceResult.length === 0 || balanceResult[0].balance < amount) {
                return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
            }
            userBalance = balanceResult[0].balance;

            await db.query("UPDATE bank SET Balance = Balance - ? WHERE User_ID = ?", [amount, user_id]);
            await db.query("UPDATE bank SET Balance = Balance + ? WHERE User_ID = ?", [amount, merchant_id]);

        } else if (payment_method === "card") {
            const [cardResult] = await db.query("SELECT PIN FROM card WHERE User_ID = ?", [user_id]);
            if (cardResult.length === 0 || cardResult[0].PIN !== card_pin) {
                return NextResponse.json({ message: "Invalid Card PIN" }, { status: 400 });
            }

            const [balanceResult] = await db.query("SELECT Balance FROM bank WHERE User_ID = ?", [user_id]);
            if (balanceResult.length === 0 || balanceResult[0].Balance < amount) {
                return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
            }
            userBalance = balanceResult[0].Balance;

            await db.query("UPDATE bank SET Balance = Balance - ? WHERE User_ID = ?", [amount, user_id]);
            await db.query("UPDATE bank SET Balance = Balance + ? WHERE User_ID = ?", [amount, merchant_id]);

        } else if (payment_method === "wallet") {
            const [balanceResult] = await db.query("SELECT Balance FROM wallet WHERE User_ID = ?", [user_id]);
            if (balanceResult.length === 0 || balanceResult[0].Balance < amount) {
                return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
            }
            userBalance = balanceResult[0].Balance;

            await db.query("UPDATE wallet SET Balance = Balance - ? WHERE User_ID = ?", [amount, user_id]);
            await db.query("UPDATE wallet SET Balance = Balance + ? WHERE User_ID = ?", [amount, merchant_id]);

        } else {
            return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
        }

        const insertTransactionQuery = `
            INSERT INTO transaction (User_ID, Merchant_ID, Payment_Method_id, Amount, Status) 
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
            return NextResponse.json({ message: "Make UPI ID first" }, { status: 400 });
        }

        const [res] = await db.query("SELECT * FROM upi WHERE UPI_ID = ?", [upi_id]);

        return NextResponse.json(res, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
