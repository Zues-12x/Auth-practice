"use client"
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

export default function pages() {

    const [form, setForm] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login",
                { email: form.email, password: form.password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    return (
        <div className="flex justify-center items-start pt-16 min-h-screen  login-page">
            <form
                className="bg-gray-900 p-6 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <div>
                    <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
                </div>
                <input
                    className="border p-2 w-full mb-4 text-black"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input
                    className="border p-2 w-full mb-4 text-black"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Password"
                    required
                />
                <Button loadingText={"Logging in..."} normalText={"Log In"} />
            </form>
        </div>
    )
}
