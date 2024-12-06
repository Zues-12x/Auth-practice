"use server"

import { cookies } from "next/headers"


export async function extractTokenFromCookieHeader(headers) {

    // Convert Headers to a plain object if it's an instance of Headers
    const plainHeaders = headers instanceof Headers
        ? Object.fromEntries(headers.entries()) // Convert Headers iterable to a plain object
        : headers;


    // Normalize headers to ensure case-insensitivity
    const normalizedHeaders = Object.keys(plainHeaders).reduce((acc, key) => {
        acc[key.toLowerCase()] = plainHeaders[key];
        return acc;
    }, {});

    const cookieHeader = normalizedHeaders['set-cookie'] || normalizedHeaders['x-middleware-set-cookie'];
    if (!cookieHeader) {
        throw new Error('No cookie header found');
    }

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    if (tokenMatch && tokenMatch[1]) {
        return tokenMatch[1]; // Return the token value
    }

    throw new Error('Token not found in cookie');
}


export async function storeToken(token) {
    try {
        const cookiestore = await cookies()
        cookiestore.set({
            name: "token",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
    } catch (error) {
        console.log(error)
        throw new Error('Error occured while setting cookies');
    }
}
