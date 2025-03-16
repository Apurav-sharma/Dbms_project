import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { fname, lname, phone, email, pin, city, state } = await req.json();

        const [userResult] = await db.query("SELECT User_ID FROM user WHERE email = ?", [email]);

        if (!userResult.length) {
            return NextResponse.json({ message: "user not found" }, { status: 404 });
        }

        const userId = userResult[0].User_ID;

        const userUpdates = [];
        const userValues = [];

        if (fname) {
            userUpdates.push("FName = ?");
            userValues.push(fname);
        }
        if (lname) {
            userUpdates.push("LName = ?");
            userValues.push(lname);
        }
        if (phone) {
            userUpdates.push("Phone = ?");
            userValues.push(phone);
        }
        if (city) {
            userUpdates.push("City = ?");
            userValues.push(city);
        }
        if (state) {
            userUpdates.push("State = ?");
            userValues.push(state);
        }

        if (userUpdates.length > 0) {
            const userQuery = `UPDATE user SET ${userUpdates.join(", ")} WHERE User_ID = ?`;
            userValues.push(userId);
            await db.query(userQuery, userValues);
        }

        if (pin) {
            await db.query("UPDATE upi SET pin = ? WHERE user_id = ?", [pin, userId]);
        }

        return NextResponse.json({ message: "User details updated successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
