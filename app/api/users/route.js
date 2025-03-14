import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [users] = await db.query("SELECT fname, phone FROM user");
        // const [merchants] = await db.query("SELECT business_name, phone FROM merchant");

        const combinedData = [
            ...users.map((user) => ({ name: user.fname, phone: user.phone, type: "user" }))
        ];

        return NextResponse.json(combinedData, { message: "Fetched successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
