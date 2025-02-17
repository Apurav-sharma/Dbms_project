import db from "@/database/connectdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(params) {
    try {
        // const sql = db.getConnection();
        const { email, password } = req.json();
        const res = await db.query("select * from users where email = $1 and password = $2", [email, password]);

        console.log(res);
        return NextResponse.json({ message: "Fetched Successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const res = await db.query("select * from users where email = ? and password = ?", [email, password]);

        console.log(res);
        return NextResponse.json({ message: "Fetched Successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}