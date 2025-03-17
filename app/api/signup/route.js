// "use server";
import db from "@/database/connectdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log(email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(email, hashedPassword);

        const res = await db.query("INSERT INTO user (email, password) VALUES (?, ?)", [email, hashedPassword]);
        console.log(res);

        // if (res.status === 200 || res.status === 201) {
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
        // }
        // } else {
        // return NextResponse.json({ message: "User already exists" }, { status: 202 });
        // }
    }
    catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}