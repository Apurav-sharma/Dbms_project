import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { email } = await params;
    // console.log(email);
    if (!email) return NextResponse.json({ error: "Email is required" });

    try {
        const [user] = await db.query("SELECT User_ID FROM user WHERE Email = ?", [email]);
        if (user.length === 0) return NextResponse.json({ error: "User not found" });

        const userId = user[0].User_ID;
        // console.log(userId);

        const [receivedTransactions] = await db.query(
            `SELECT t.Transaction_ID, t.User_ID AS another_user, t.Amount, t.Time_Stamp, t.status, u.fname
             FROM transaction t
             LEFT JOIN user u ON u.user_id = t.User_ID
             WHERE t.Merchant_ID = ? AND t.watched = FALSE`,
            [userId]
        );

        // console.log(receivedTransactions);

        // const transactions = await db.query(
        //     "SELECT Amount FROM transaction WHERE user_id = ? AND status = 'Success' ORDER BY time_stamp DESC LIMIT 5",
        //     [userId]
        // );

        const notifications = [...receivedTransactions].reverse().map(txn => ({
            id: txn.Transaction_ID,
            message: `₹${txn.Amount} credited to your account`,
        }));

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        NextResponse.json({ error: "Internal Server Error" });
    }
}

export async function POST(req) {
    try {

        const { notifications } = await req.json();
        // console.log(notifications)

        // if (!notifications || !Array.isArray(notifications)) {
        //     return NextResponse.json({ error: "Invalid notifications data" }, { status: 400 });
        // }

        const transactionIds = notifications.map(n => n.id);
        // console.log(transactionIds)

        if (transactionIds.length === 0) {
            return NextResponse.json({ message: "No notifications to update" }, { status: 200 });
        }

        await db.query("UPDATE transaction SET watched = TRUE WHERE Transaction_ID IN (?)", [transactionIds]);

        return NextResponse.json({ message: "Notifications marked as watched" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
