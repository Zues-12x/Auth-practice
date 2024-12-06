import { signUpAction } from "../actions/actions";
import Button from "../components/Button";

export default function page() {
    return (
        <div className="flex justify-center items-start min-h-screen">
            <form
                className="bg-gray-900 p-6 mt-14 rounded-lg shadow-lg"
                action={signUpAction}
            >
                <h2 className="text-2xl text-white font-bold mb-4">Signup</h2>
                <input
                    name="username"
                    placeholder="Username"
                    className="border rounded-md p-2 w-full mb-4 text-black"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border rounded-md p-2 w-full mb-4 text-black"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border rounded-md p-2 w-full mb-4 text-black"
                />
                <Button normalText={"Sign Up"} loadingText={"Signing Up..."} />
            </form>
        </div >
    )
}

