import SideNav from "../ui/NavLinks";
import SignOutForm from "../ui/SignOutForm";

import clsx from "clsx";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-col-reverse min-h-screen lg:flex-row lg:gap-4 lg:pr-4`}>
            <header
                className={clsx(
                    `fixed z-10 left-0 bottom-0 border-solid border-gray-300 pt-2 px-4 backdrop-blur-2xl w-full lg:w-auto
             bg-[hsl(var(--grey-900))] lg:sticky lg:top-0 lg:h-screen lg:border lg:pt-4 lg:px-0 rounded-t-lg lg:rounded-tl-none
             lg:rounded-r-2xl flex flex-row lg:flex-col justify-start items-center lg:pb-4 lg:max-w-[18.75rem]`
                   
                )}
            >
                <SideNav />
                <div className="lg:relative self-start m-2">
                    <SignOutForm />
                </div>
            </header>

            <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-4">
                {children}
            </main>
        </div>
    );
}
