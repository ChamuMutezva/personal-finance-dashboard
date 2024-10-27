import SideNav from "../ui/SideNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
            <div
                className={`flex flex-col-reverse max-h-screen lg:flex-row`}
            >
                <SideNav />
                {children}
            </div>
        
    );
}