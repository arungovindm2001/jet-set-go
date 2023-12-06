import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        cookies().delete('username');
        return NextResponse.json({ message: "Signed out successfully" }, { status: 200 });
    } catch(e) {
        return NextResponse.json({ message: "Some error occured" }, { status: 401 });
    }
}