import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        if (!params || !params.email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

        const { email } = params;

        const [userData] = await db.query(
            `SELECT user_id FROM user WHERE email = ?`,
            [email]
        );

        if (userData.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = userData[0].user_id;

        const [sentTransactions] = await db.query(
            `select *, user.fname from
            (SELECT t.Transaction_ID, t.Merchant_ID AS another_user, t.Amount, t.Time_Stamp, t.status, u.fname
             FROM transaction t
             LEFT JOIN user u ON u.user_id = t.user_id
             WHERE t.user_id = ?) as anth left join user on user.user_id = anth.another_user`,
            [userId]
        );
        // console.log(sentTransactions);

        const [receivedTransactions] = await db.query(
            `SELECT t.Transaction_ID, t.User_ID AS another_user, t.Amount, t.Time_Stamp, t.status, u.fname
             FROM transaction t
             LEFT JOIN user u ON u.user_id = t.User_ID
             WHERE t.Merchant_ID = ?`,
            [userId]
        );

        const combinedData = [
            ...receivedTransactions.map((tx) => ({
                id: tx.Transaction_ID,
                another_user_id: tx.another_user,
                another_user: tx.fname || "Unknown",
                type: "received",
                amount: tx.Amount,
                time: tx.Time_Stamp,
                status: tx.status,
            })),
            ...sentTransactions.map((tx) => ({
                id: tx.Transaction_ID,
                another_user_id: tx.another_user,
                another_user: tx.fname || "Unknown",
                type: "send",
                amount: tx.Amount,
                time: tx.Time_Stamp,
                status: tx.status,
            })),
        ];

        return NextResponse.json(combinedData, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
