import React from "react";
import Image from "next/image";
import LoginForm from "../ui/login/login-form";

export default function Login() {
    return (
        <main className="flex items-center relative justify-center min-h-screen w-full lg:p-2">
            <div
                className="hidden lg:block left-0 top-0 w-full lg:h-[57.5rem] bg-[hsl(var(--grey-900))]
                             lg:w-5/12 justify-center p-6 rounded-b-xl lg:rounded-2xl object-cover bg-none
                             lg:bg-[url('/assets/images/illustration-authentication.svg')] bg-top bg-auto bg-no-repeat"
            >
                <Image
                    alt=""
                    width={122}
                    height={22}
                    src="/assets/images/logo-large.svg"
                    priority
                    className="lg:absolute lg:left-8"
                />
                {/*
                <Image
                    src="/assets/images/illustration-authentication.svg"
                    alt=""
                    height={920}
                    width={560}
                    className="hidden max-w-[100%] lg:block aspect-auto"
                />
                */}
                <div className="sr-only lg:not-sr-only lg:absolute bottom-12 left-4 p-6 max-w-md">
                    <h1 className="text-preset-1 font-bold text-[hsl(var(--white))] leading-none mb-5">
                        Keep track of your money and save for the future
                    </h1>
                    <p className="text-preset-4 text-[hsl(var(--white))]">
                        Personal finance app puts you in control of your
                        spending. Track transactions, set budgets , and add to
                        savings pots early
                    </p>
                </div>
            </div>
            <div className="flex justify-center lg:w-7/12  max-w-[30rem] lg:max-w-full  p-4">
                 <LoginForm />
            </div>
        </main>
    );
}
