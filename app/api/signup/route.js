import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        await db.query("insert into users (email, password) value (?, ?)", [email, password]);
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}