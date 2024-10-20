import SideNav from "../ui/SideNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col-reverse max-h-screen lg:flex-row bg-[hsl(var(--beige-100))] p-4`}
            >
                <SideNav />
                {children}
            </body>
        </html>
    );
}
