// "use server";
import db from "@/database/connectdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        // console.log(email, password);
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
        return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}