import { connect } from "@/app/_lib/dbConfig";
import User from "@/app/_models/User.model";
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(NextRequest) {

    try {

        const { token } = await NextRequest.json();
        console.log(token)
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ messaage: "Invalid or exprired token" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({ messaage: "Email verified successfully", success: true }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
