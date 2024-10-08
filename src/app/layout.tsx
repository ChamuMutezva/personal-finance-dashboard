import type { Metadata } from "next";
import { publicSans } from "./ui/fonts";
import SideNav from "./ui/SideNav";
import "./globals.css";

export const metadata: Metadata = {
    title: "Personal finance dashboard",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${publicSans.className} antialiased flex flex-col-reverse lg:flex-row bg-[hsl(var(--beige-100))]`}
            >
                <SideNav />
                {children}
            </body>
        </html>
    );
}
