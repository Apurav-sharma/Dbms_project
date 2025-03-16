import db from "@/database/connectdb";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    try {

        const { email } = await params;
        if (!email) {
            return NextResponse.json({ message: "Missing email parameter" }, { status: 404 });
        }

        const [data] = await db.query("select user_id from user where email = ?", [email]);

        if (data.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const user_id = data[0].user_id;
        const [pin] = await db.query("select pin from upi where user_id = ?", [user_id]);

        return NextResponse.json(pin[0], { message: "fetched" }, { status: 200 });


    } catch (err) {
        return NextResponse.json(err.message, { status: 500 });
    }
}