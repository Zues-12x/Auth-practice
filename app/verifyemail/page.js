import { verifyAction } from "../actions/actions";
import Button from "../components/Button";

export default async function page({ searchParams }) {

    const { token } = await searchParams || " ";

    return (
        <main className='flex justify-center items-center flex-col gap-6 pt-32'>
            <h1 className='text-3xl font-semibold'>Click here to verify your account</h1>
            <form action={verifyAction}>
                <input
                    name="token"
                    type="hidden"
                    value={token}
                />
                <Button normalText={"Verify your account"} loadingText={"Verifying..."} isDisabled={token?.length < 45} />
            </form>
        </main>
    )
}
