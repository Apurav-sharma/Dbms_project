import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { fname, lname, email, password, phone, city, state, country } = await req.json();

        await db.query(
            "INSERT INTO user (fname, lname, email, password, phone, city, state, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [fname, lname, email, password, phone, city, state, country]
        );

        const {accountno, ifsccode, pin} = await req.json();
        
        await db.query(
            "INSERT INTO upi (accountno, ifsccode, pin, user_id) VALUES ($1, $2, $3, (SELECT id FROM user WHERE email = $4))",
            [accountno, ifsccode, pin, email]
        );

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}