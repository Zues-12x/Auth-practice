import { connect } from "@/app/_lib/dbConfig";
import User from "@/app/_models/User.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect();

export async function POST(NextRequest) {
    try {
        const reqBody = NextRequest.json();
        const { username, email, password } = reqBody;

        const user = User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "This email is already registered" }, { status: 400 });
        }

        const salt = bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

    } catch (error) {
        return NextResponse.json({ error: error.msg }, { status: 500 })
    }
}

