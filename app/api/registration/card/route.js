import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { cvv, cardNumber, expiryDate, cardPin, email, pin } = await req.json();

        if (!cvv || !cardNumber || !expiryDate || !cardPin || !email || !pin) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const [data] = await db.query("select user_id from user where email = ?", [email]);

        if (!data.length) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        const user_id = data[0].user_id;
        const [balance] = await db.query('select balance from bank where user_id = ?', [user_id])

        if (balance.length === 0) {
            return NextResponse.json({ message: "Do registration first" }, { status: 203 });
        }

        const amount = balance[0].balance;

        let [month, year] = expiryDate.split("/");
        year = `20${year}`;
        const formattedExpiryDate = `${year}-${month}-01`;

        await db.query(`
                INSERT INTO card (user_id, card_number, expiry_date, cvv, pin, balance, card_type) values (?, ?, ?, ?, ?, ?, ?)
            `, [user_id, cardNumber, formattedExpiryDate, cvv, cardPin, amount, "debit"])

        return NextResponse.json({ message: "Card added successfully" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}