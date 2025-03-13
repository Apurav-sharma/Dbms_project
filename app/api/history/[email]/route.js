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

        return NextResponse.json(hist, { message: "fetched transaction" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}