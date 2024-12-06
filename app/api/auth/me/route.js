const { connect } = require("@/app/_lib/dbConfig");
const { default: User } = require("@/app/_models/User.model");
const { NextResponse, NextRequest } = require("next/server");
import { getToken } from "@/app/_utils/extractToken";

connect()

export async function POST(NextRequest) {
    try {
        const id = await getToken(NextRequest);
        const user = await User.findOne({ _id: id }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        return NextResponse.json({ success: true, data: user }, { status: 200 },)

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}