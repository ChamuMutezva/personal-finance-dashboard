"use client"; // Error boundaries must be Client Components
import { Button } from "@/components/ui/button";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex justify-center items-center flex-col min-h-dvh">
            <h2>Something went wrong!</h2>
            <p>Failed to fetch data. Check your network connection</p>
            <Button
                className="mt-4 py-7 flex justify-center items-center bg-[hsl(var(--grey-900))] dark:bg-[hsl(var(--white))] dark:text-black"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                {" "}
                Try again
            </Button>
        </div>
    );
}
