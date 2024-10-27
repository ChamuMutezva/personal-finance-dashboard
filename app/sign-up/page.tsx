import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function SignUp() {
  return (
    <main className="flex items-center relative justify-center h-screen w-full bg-[hsl(var(--grey-900))] p-2">
            <Card className="p-6 max-w-prose">
                <h1 className="text-preset-1 font-bold text-[hsl(var(--grey-900)]">
                    Coming soon...
                </h1>
                
                <Link href={"/login"} className="inline-block text-center transition duration-300 ease-in-out px-5 py-2 rounded-md bg-[hsl(var(--cyan))]">Log in</Link>
            </Card>
        </main>
  );
}