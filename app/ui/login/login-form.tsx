"use client";
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/action";
import Link from "next/link";

export default function LoginForm() {
    const [errorMessage, formAction] = useFormState(authenticate, undefined);

    return (
        <form action={formAction} className="max-w-[35rem] w-full">
            <div className="rounded-lg bg-gray-50 p-4">
                <h2 className={` mb-3 text-preset-1 font-bold`}>
                    Please log in to continue.
                </h2>

                <div className="w-full">
                    {/* EMAIL */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                aria-describedby={
                                    errorMessage ? "email-error" : undefined
                                }
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                                aria-describedby={
                                    errorMessage ? "password-error" : undefined
                                }
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <LoginButton />

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p
                                id={
                                    errorMessage.includes("email")
                                        ? "email-error"
                                        : "password-error"
                                }
                                className="text-sm text-red-500"
                            >
                                {errorMessage}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <p className="text-center my-2">
                Need to create an account?{" "}
                <Link
                    href={"/sign-up"}
                    className="font-bold text-preset-4 text-[hsl(var(--grey-900))]"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    const handleClick = (event: { preventDefault: () => void }) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <Button
            className="mt-4 py-7 w-full flex justify-center items-center"
            onClick={handleClick}
            aria-disabled={pending}
        >
            Log in <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </Button>
    );
}
