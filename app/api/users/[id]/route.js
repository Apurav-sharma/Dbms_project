import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {

        // if (!params || !params.id) {
        //     return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        // }

        const { id } = await params;
        // console.log(id);

        if (!id) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const [user] = await db.query("select fname from user where user_id = ?", [id]);

        if (user.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user[0], { message: `Hello ${user[0].fname}!` }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}