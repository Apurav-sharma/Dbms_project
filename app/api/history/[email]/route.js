import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {

        if (!params || !params.email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

        const { email } = params;
        // console.log(email);

        const [data] = await db.query("select user_id from user where email = ?", [email]);

        if (!data || !data.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // console.log(data);

        const user_id = data[0].user_id;
        // console.log(user_id);

        const [hist] = await db.query("select * from transaction where user_id = ?", [user_id]);

        const [hist2] = await db.query("select * from transaction where merchant_id = ?", [user_id]);

        const combinedData = [
            ...hist2.map((merchant) => ({ id: merchant.Transaction_ID, another_user: merchant.User_ID, type: "received", amount: merchant.Amount, time: merchant.Time_Stamp, status: merchant.status })),
            ...hist.map((user) => ({ id: user.Transaction_ID, another_user: user.Merchant_ID, type: "send", amount: user.Amount, time: user.Time_Stamp, status: user.status}))
        ];

        return NextResponse.json(combinedData, { message: "fetched transaction" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}