import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { user_id, bank_id } = await req.json();

        if (!user_id || !bank_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const query = "INSERT INTO upi (User_ID, Bank_ID) VALUES (?, ?)";
        const values = [user_id, bank_id];

        const [result] = await db.query(query, values);

        return NextResponse.json({
            message: "UPI record created successfully",
            upi_id: result.insertId
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}