import { connect } from "@/app/_lib/dbConfig";
import User from "@/app/_models/User.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendMail } from "@/app/_utils/mailer";

connect();

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "This email is already registered" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: "User registered successfully", success: true, savedUser })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}