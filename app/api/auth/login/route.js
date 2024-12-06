import { connect } from "@/app/_lib/dbConfig";
import User from "@/app/_models/User.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const jwtSecret = process.env.TOKEN_SECRET;
connect();

export async function POST(NextRequest) {

    try {
        const { email, password } = await NextRequest.json()

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        const isPassValid = await bcryptjs.compare(password, user.password);

        if (!isPassValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
        }

        const token = await jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

        const response = NextResponse.json({ message: "Logged in successfully", success: true })

        response
            .cookies.set("token", token, {
                maxAge: 99999999,
                httpOnly: true,
                sameSite: "strict",
            })

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}