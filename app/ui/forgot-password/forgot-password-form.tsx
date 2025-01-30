"use client";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordReset } from "@/lib/actionsAuth";
import { RequestEmailFormState } from "@/lib/definitions";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";


const initialState: RequestEmailFormState = {
    errors: {},
    message: "",
    success: false,
  }

export default function ForgotPasswordForm() {
    const [state, formAction] = useFormState(requestPasswordReset, initialState);
   // const router = useRouter();

    useEffect(() => {
        if (state?.success) {
          // Option 1: Redirect to another page
          // router.push('/password-reset-requested')
          // Option 2: Show success message on the same page (implemented below)
        }
      }, [state?.success])

      if (state?.success) {
        return (
          <div className="max-w-[35rem] w-full p-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-900 p-4">
              <h2 className="mb-3 text-preset-1 leading-tight font-bold text-green-800 dark:text-green-200">
                Password Reset Email Sent
              </h2>
              <p className="mb-4 text-sm text-green-700 dark:text-green-300">{state.message}</p>             
              <Link
                href="/login"
                className="font-bold text-preset-4 text-[hsl(var(--grey-900)) mt-4 px-4 py-2 rounded-md  transition-colors"
              >
                Return to Login
              </Link>
            </div>
          </div>
        )
      }

    return (
        <form action={formAction} className="max-w-[35rem] w-full p-4">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                <h2 className={`mb-3 text-preset-1 leading-tight font-bold`}>
                    Forgot Password
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-white">
                    Enter your email address and we'll send you a link to reset
                    your password.
                </p>

                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                aria-required="true"
                                aria-describedby={
                                    state?.errors?.email
                                        ? "email-error errors"
                                        : undefined
                                }
                                aria-invalid={!!state?.errors?.email}
                            />
                            <AtSymbolIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]
                             -translate-y-1/2 text-gray-500 dark:text-white peer-focus:text-gray-900"
                            />
                        </div>
                        {state?.errors?.email && (
                            <p id="errors" className="text-sm text-red-500">
                                {state.errors.email}
                            </p>
                        )}
                    </div>
                </div>
                <ResetButton />

                <div
                    className="flex items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state?.errors?.general && (
                        <p id="email-error" className="text-sm text-red-500">
                            {state.errors.general}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-4 text-center">
                <Link
                    href="/login"
                    className="text-sm font-bold text-preset-4 text-[hsl(var(--grey-900))] border p-2 rounded-md shadow"
                >
                    Back to Login
                </Link>
            </div>
        </form>
    );
}

function ResetButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="mt-4 py-7 w-full flex justify-center items-center bg-[hsl(var(--grey-900))]
             border border-black dark:text-white"
            aria-disabled={pending}
        >
            {pending ? <span>Submitting...</span> : <span>Reset Password</span>}
            <ArrowRightIcon className="h-5 w-5 text-gray-50 dark:text-[hsl(var(--grey-900))]" />
        </Button>
    );
}
