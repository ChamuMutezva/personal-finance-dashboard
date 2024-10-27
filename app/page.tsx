import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center relative justify-center h-screen w-full bg-[hsl(var(--grey-900))] lg:p-2">
            <div className="p-6">
                <h1 className="text-preset-1 font-bold text-[hsl(var(--white))]">
                    Keep track of your money and save for the future
                </h1>
                <p className="text-preset-4 text-[hsl(var(--white))]">
                    Personal finance app puts you in control of your spending.
                    Track transactions, set budgets , and add to savings pots
                    early
                </p>
                <Link href={"/login"} className="inline-block text-center transition duration-300 ease-in-out px-5 py-2 rounded-md bg-[hsl(var(--cyan))]">Log in</Link>
            </div>
        </main>
  );
}
