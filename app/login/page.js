import { logInAction } from "../actions/actions";

export default async function pages() {


    return (
        <div className="flex justify-center items-start pt-16 min-h-screen  login-page">
            <form
                className="bg-gray-900 p-6 rounded-lg shadow-lg"
                action={logInAction}
            >
                <div>
                    <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
                </div>
                <input
                    className="border p-2 w-full mb-4 text-black"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="border p-2 w-full mb-4 text-black"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
