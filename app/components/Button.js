"use client"

import { useFormStatus } from "react-dom";

export default function Button({ loadingText, normalText, isDisabled = false }) {

    const { pending } = useFormStatus()
    return (
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded
       hover:bg-blue-700 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            disabled={pending || isDisabled}
        >
            {pending ? loadingText : normalText}
        </button>
    )
}
