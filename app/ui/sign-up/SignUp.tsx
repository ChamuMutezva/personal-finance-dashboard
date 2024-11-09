"use client";
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/lib/action";
import Link from "next/link";

const INITIAL_STATE = {
    message: "",
    errors: {},
};

export default function SignUpForm() {
    const [state, action] = useFormState(createUser, INITIAL_STATE);
    

    return (
        <form action={action} className="max-w-[35rem] w-full">
            <div className="rounded-lg bg-gray-50 p-4">
                <h2 className={`mb-3 text-preset-1 font-bold`}>Sign up</h2>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                aria-required="true"
                                aria-describedby={
                                    state?.errors?.name
                                        ? "name-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.name}
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.name && (
                            <p
                                id="name-error"
                                className="text-red-500 text-sm"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {state.errors.name.join(", ")}
                            </p>
                        )}
                    </div>

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
                                aria-required="true"
                                aria-describedby={
                                    state?.errors?.email
                                        ? "email-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.email}
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.email && (
                            <p
                                id="email-error"
                                className="text-red-500 text-sm"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {state.errors.email.join(", ")}
                            </p>
                        )}
                    </div>
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
                                aria-required="true"
                                minLength={6}
                                aria-describedby={
                                    state?.errors?.password
                                        ? "password-error"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.password}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.password && (
                            <div>
                                <p>Password must:</p>
                                <ul
                                    id="password-error"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {state.errors.password.map((error) => (
                                        <li
                                            className="text-red-500 text-sm"
                                            key={error}
                                        >
                                            - {error}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <SignUpButton />
            </div>
            <p className="text-center my-2">
                Already have an account?{" "}
                <Link
                    href={"/login"}
                    className="font-bold text-preset-4 text-[hsl(var(--grey-900))]"
                >
                    Login
                </Link>
            </p>
        </form>
    );
}

function SignUpButton() {
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
            {pending ? (
                <span className="text-[red]">Submitting...</span>
            ) : (
                <span> Sign up</span>
            )}
            <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </Button>
    );
}
