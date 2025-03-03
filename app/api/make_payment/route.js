import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        
        const {user_id, merchant_id, payment_method_id, amount} = await req.json();

        if(!user_id || !merchant_id || !amount || payment_method_id) {
            return new NextResponse(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const res = await db.query("select amount from upi left join user on user.id = upi.user_id");

        console.log(res);






    } catch(err) {
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
}