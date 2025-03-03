import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { user_id, merchant_id, payment_method_id, amount } = await req.json();

        if (!user_id || !merchant_id || !amount || !payment_method_id) {
            return new NextResponse(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const res = await db.query("select * from upi, user where user.user_id = upi.user_id");
        // console.log(res);

        if (res[0].length === 0) {
            return new NextResponse(JSON.stringify({ message: "UPI Id not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Payment successful" }), { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
}

export async function GET(req) {
    try {

        const { upi_id } = await req.json();

        if (!upi_id) {
            return NextResponse(JSON.stringify({ message: "Make UPI ID first" }), { status: 400 });
        }

        const res = await db.query("select * from upi where upi_id = ?", [upi_id]);

        return NextResponse.json(res, { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
}