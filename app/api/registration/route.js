import db from "@/database/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { fname, lname, email, phone, city, state, accountno, ifsccode, pin } = await req.json();
        // console.log(fname, lname, email, phone, city, state, accountno, ifsccode, pin);

        const userUpdateResult = await db.query(
            "UPDATE user SET fname = ?, lname = ?, phone = ?, city = ?, state = ? WHERE email = ?",
            [fname, lname, phone, city, state, email]
        );

        if (userUpdateResult.affectedRows === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const [user] = await db.query("SELECT user_id FROM user WHERE email = ?", [email]);

        if (user.length === 0) {
            return NextResponse.json({ message: "User not found after update" }, { status: 404 });
        }

        const userId = user[0].user_id;
        // console.log(userId)

        if (isMerchant === true) {
            await db.query(`
                INSERT INTO merchant (fname, lname, email, phone, user_id) VALUES (?,?,?,?,?)
                `,[fname, lname, email, phone, userId])
        }

        const [upiExists] = await db.query("SELECT user_id FROM bank WHERE user_id = ?", [userId]);
        // console.log(upiExists)

        if (upiExists.length > 0) {
            await db.query(
                "UPDATE bank SET account_no = ?, ifsc_code = ?, balance = 1000 WHERE user_id = ?",
                [accountno, ifsccode, userId]
            );

            await db.query(
                "UPDATE upi SET pin = ? WHERE user_id = ?",
                [pin, userId]
            );

        } else {
            await db.query(
                "INSERT INTO bank (account_no, ifsc_code, user_id, balance) VALUES (?, ?, ?, 1000)",
                [accountno, ifsccode, userId]
            );
            await db.query(
                "INSERT INTO upi (pin, user_id) VALUES (?, ?)",
                [pin, userId]
            );
        }

        return NextResponse.json({ message: "User and UPI details updated successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
