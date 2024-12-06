import { connect } from "@/app/_lib/dbConfig";
import { NextRequest, NextResponse } from 'next/server';


const jwtSecret = process.env.TOKEN_SECRET;
connect();

export async function GET(NextRequest) {
    try {

        const response = NextResponse.json({ message: "logged out successfully", success: true });

        response.cookies.set("token", "", {
            httpOnly: true,
            sameSite: "strict",
        });
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}