import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {

        if (!params || !params.email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

        const { email } = params;

        const [data] = await db.query("select user_id from user where email = ?", [email]);
        const id = data[0].user_id;

        const [wallet] = await db.query("select *from wallet where user_id = ?", [id]);

        if (wallet.length === 0) {
            return NextResponse.json({ message: "wallet is not initialized" }, { status: 202 });
        }

        return NextResponse.json(wallet, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {

    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

        const [userData] = await db.query(
            `SELECT u.user_id, w.balance FROM user u 
         JOIN wallet w ON u.user_id = w.user_id 
         WHERE u.email = ?`,
            [email]
        );

        if (!userData || userData.length === 0) {
            return NextResponse.json({ error: "User not found or no wallet balance" }, { status: 404 });
        }

        const { user_id, balance } = userData[0];

        if (balance <= 0) {
            return NextResponse.json({ message: "No balance to transfer" }, { status: 200 });
        }

        await db.query(
            `UPDATE bank_account 
         SET balance = balance + ? 
         WHERE user_id = ?`,
            [balance, user_id]
        );

        await db.query(
            `UPDATE wallet 
         SET balance = 0 
         WHERE user_id = ?`,
            [user_id]
        );

        return NextResponse.json({ message: "Balance transferred successfully", transferredAmount: balance }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}