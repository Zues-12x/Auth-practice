import { verifyAction } from "../actions/actions";

export default async function page({ searchParams }) {

    const data = await searchParams;
    return (
        <main className='flex justify-center items-center flex-col gap-6 pt-32'>
            <h1 className='text-3xl font-semibold'>Click here to verify your account</h1>
            <form action={verifyAction}>
                <input
                    name="token"
                    type="hidden"
                    value={data.token}
                />
                <button
                    type="submit"
                    className='inline-block bg-blue-700 text-gray-300 px-6 py-3 text-lg'>
                    Verfiy Account
                </button>
            </form>
        </main>
    )
}
