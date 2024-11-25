import SignUpForm from "../ui/sign-up/SignUp";
import Image from "next/image";

export default function SignUp() {
    return (
        <main className="flex flex-col items-center justify-center relative lg:justify-around min-h-screen  lg:flex-row w-full lg:p-4">
            <div
                className="flex flex-col justify-between items-center lg:items-stretch absolute lg:relative top-0 w-full lg:h-dvh bg-[hsl(var(--grey-900))]
               lg:w-5/12 p-6 rounded-b-xl lg:rounded-2xl object-cover bg-none
                lg:bg-[url('/assets/images/illustration-authentication.svg')] bg-top bg-auto bg-no-repeat"
            >
                <Image
                    alt=""
                    width={122}
                    height={22}
                    src="/assets/images/logo-large.svg"
                    priority
                    className="lg:left-8"
                />

                <div
                    className="sr-only lg:not-sr-only lg:relative lg:p-6 max-w-md bg-[hsl(var(--green))]
                rounded-md shadow-lg"
                >
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
            <div className="flex justify-center lg:w-7/12  max-w-[30rem] w-full lg:max-w-full  p-4">
                <SignUpForm />
            </div>
        </main>
    );
}
