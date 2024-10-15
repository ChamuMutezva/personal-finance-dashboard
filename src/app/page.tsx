import Image from "next/image";
import { fetchBalance } from "./lib/data";
import { Card } from "@/components/ui/card";

export default async function Home() {
    const balance = await fetchBalance();
    console.log(balance);
    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Overview
                </h1>
            </div>
            <section aria-label="general overview">
                <Card className="p-4">
                    <h2>Current balance</h2>
                    <p>{balance[0].current}</p>
                </Card>
                <Card className="p-4">
                    <h2>Income</h2>
                    <p>{balance[0].income}</p>
                </Card>
                <Card className="p-4">
                    <h2>Expenses</h2>
                    <p>{balance[0].expenses}</p>
                </Card>
            </section>
        </main>
    );
}
