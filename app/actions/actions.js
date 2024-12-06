
"use server"

import { redirect } from "next/navigation"

export async function signUpAction(formdata) {
    try {
        const username = formdata.get("username")
        const email = formdata.get("email")
        const password = formdata.get("password")

        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username, email, password
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "An error occured");
        }
    }
    catch (error) {
        throw new Error("SignUp unsuccessful " + error)
    }

    redirect("/login")
}

export async function logInAction(formdata) {
    try {
        const email = formdata.get("email")
        const password = formdata.get("password")

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "An error occured");
        }
    } catch (error) {
        throw new Error("Login unsuccessful " + error)
    }
}

export async function verifyAction(formdata) {
    const token = formdata.get("token")

    try {
        const response = await fetch('http://localhost:3000/api/auth/verifyemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "An error occured");
        }
    } catch (error) {
        throw new Error("Verification unsuccessful " + error)
    }
    redirect('/profile')
}