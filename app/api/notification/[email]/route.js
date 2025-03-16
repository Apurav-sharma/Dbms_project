import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const { email } = await params;
    console.log(email);
    if (!email) return NextResponse.json({ error: "Email is required" });

    try {
        const user = await db.query("SELECT User_ID FROM user WHERE Email = ?", [email]);
        if (user.length === 0) return NextResponse.json({ error: "User not found" });

        const userId = user[0].User_ID;

        // Get credited transactions
        const transactions = await db.query(
            "SELECT Amount FROM transaction WHERE user_id = ? AND Status = 'Success' ORDER BY time_stamp DESC LIMIT 5",
            [userId]
        );

        const notifications = transactions.map(txn => ({
            message: `₹${txn.Amount} credited to your account`,
        }));

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        NextResponse.json({ error: "Internal Server Error" });
    }
}
