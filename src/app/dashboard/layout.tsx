import SideNav from "../ui/SideNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased flex flex-col-reverse lg:flex-row bg-[hsl(var(--beige-100))]`}
            >
                <SideNav />
                {children}
            </body>
        </html>
    );
}
