import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch user and merchant data
        const [users] = await db.query("SELECT fname, phone FROM user");
        const [merchants] = await db.query("SELECT business_name, phone FROM merchant");

        // Merge both arrays into one
        const combinedData = [
            ...users.map((user) => ({ name: user.fname, phone: user.phone, type: "user" })),
            ...merchants.map((merchant) => ({ name: merchant.business_name, phone: merchant.phone, type: "merchant" }))
        ];

        return NextResponse.json({ data: combinedData, message: "Fetched successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
