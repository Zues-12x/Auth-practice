'use client';

export default function error({ error, reset }) {
    return (
        <main className='flex justify-center items-center flex-col gap-6 pt-32'>
            <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
            <p className='text-lg'>{error.message}</p>

            <button
                onClick={reset}
                className='inline-block bg-red-700 text-gray-300 px-6 py-3 text-lg'>
                Try again
            </button>
        </main>
    )
}
