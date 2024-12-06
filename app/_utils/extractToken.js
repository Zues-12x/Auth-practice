import jwt from "jsonwebtoken"
const { NextRequest } = require("next/server");

const jwtSecret = process.env.TOKEN_SECRET;


export async function getToken(NextRequest) {
    try {
        const token = NextRequest.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, jwtSecret);
        return decodedToken.id;

    } catch (error) {
        throw new Error(error.message)
    }
}