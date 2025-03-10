import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl;
    if (url.pathname !== url.pathname.toLowerCase()) {
        return NextResponse.redirect(new URL(url.pathname.toLowerCase(), req.url));
    }
    return NextResponse.next();
}
