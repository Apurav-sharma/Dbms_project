import db from "@/database/connectdb";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    try {
        // if (!params || !params.email) {
        //     return NextResponse.json({ message: "Email parameter is missing" }, { status: 400 });
        // }
        const { email } = await params;
        console.log(email);

        if(!email) {
            return NextResponse.json({ message: "Email parameter is missing" }, { status: 400 });
        }
        // console.log(email);

        const [data] = await db.query("select * from user left join upi on upi.user_id = user.user_id where email = ?", [email]);
        // console.log(data)

        return NextResponse.json(data[0], { message: `fetched` }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}