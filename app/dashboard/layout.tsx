import SideNav from "../ui/SideNav";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-col-reverse max-h-screen lg:flex-row`}>
            <SideNav />
            <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-4">
                {children}
            </main>
        </div>
    );
}
