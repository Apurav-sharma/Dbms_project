import db from "@/database/connectdb";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {email} = params;
        console.log(email);

        const [data] = await db.query("select fname, phone from user where email = ?", [email]);
        console.log(data)

        return NextResponse.json(data[0], { message: `fetched` }, {status: 200});

    } catch(err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}