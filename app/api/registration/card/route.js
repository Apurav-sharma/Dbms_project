import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const {cvv, cardNumber, expiryDate, cardPin, email, pin} = await req.json();

        // Validate inputs
        if (!cvv ||!cardNumber ||!expiryDate || !cardPin || !email || !pin) {
            return NextResponse.json({message: "All fields are required"}, {status: 400});
        }

        await db.query(`
                INSERT INTO card (user_id, card_number, expiry_date, cvv, pin, )
            `)






    } catch (err) {
        return NextResponse.json({message: err.message}, {status: 500});
    }
}