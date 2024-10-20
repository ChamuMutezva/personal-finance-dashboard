import React from "react";
import Image from "next/image";

import LoginForm from "./ui/login/login.form";

export default async function Login() {
    return (
        <main className="flex items-center relative justify-center h-screen lg:h-[50vh] max-h-[100vh] w-full lg:p-2">
            <div
                className="absolute lg:relative left-0 top-0 w-full flex  bg-[hsl(var(--grey-900))]
                  lg:flex-1 justify-center items-center p-6 rounded-b-sm"
            >
                <Image
                    alt=""
                    width={122}
                    height={22}
                    src="/assets/images/logo-large.svg"
                    priority
                    className="lg:hidden"
                />
                <Image
                    src="/assets/images/illustration-authentication.svg"
                    alt=""
                    height={920}
                    width={560}
                    className="hidden lg:block"
                />
            </div>
            <div className="flex flex-1 w-full max-w-[30rem] lg:max-w-full flex-col p-4">
                <LoginForm />
            </div>
        </main>
    );
}
