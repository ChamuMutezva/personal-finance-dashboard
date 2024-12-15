import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col gap-4 items-center relative justify-center h-screen w-full bg-[hsl(var(--grey-900))] p-2">
            <div className="container max-w-screen-sm flex flex-col gap-4">
                <Card className="bg-[hsl(var(--green))] flex items-end p-6 w-full sm:min-h-40">
                    <Image
                        src="/assets/images/logo-large.svg"
                        height={22}
                        width={122}
                        alt="Finance application"
                    />
                </Card>
                <Card className="p-6 w-full flex flex-col items-baseline gap-6">
                    <h1 className="text-preset-1 font-bold text-[hsl(var(--grey-900)]">
                        Welcome to Personal Finance app
                    </h1>
                    <p className="text-preset-4 text-[hsl(var(--grey-900))]">
                        Personal finance app puts you in control of your
                        spending. Track transactions, set budgets , and add to
                        savings pots early
                    </p>
                    <Link
                        href={"/login"}
                        className="inline-block text-center transition duration-300 ease-in-out px-5 py-2 
                        rounded-md bg-[hsl(var(--cyan))] border border-white"
                    >
                        Log in
                    </Link>
                </Card>
            </div>
        </main>
    );
}
