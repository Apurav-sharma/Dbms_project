import db from "@/database/connectdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(email, password);
        const res = await db.query("select * from user where email = ?", [email]);

        // console.log(res);

        if (res[0] && res[0][0]) {
            const isPasswordMatch = await bcrypt.compare(password, res[0][0].password);
            console.log(isPasswordMatch);

            if (isPasswordMatch) {
                return NextResponse.json({ message: "User already exists" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Password wrong" }, { status: 202 });
            }
        } else {
            return NextResponse.json({ message: "user Not found" }, { status: 202 });
        }

        // console.log(res[0][0].password);
        return NextResponse.json({ message: "Not Present Sign in first" }, { status: 202 });
    }
    catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}