import React from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
    {
        name: "Overview",
        href: "/",
        icon: "assets/images/icon-nav-overview.svg",
    },
    {
        name: "Transactions",
        href: "/transactions",
        icon: "assets/images/icon-nav-transactions.svg",
    },
    {
        name: "Budgets",
        href: "/budgets",
        icon: "assets/images/icon-nav-budgets.svg",
    },
    { name: "Pots", href: "/pots", icon: "assets/images/icon-nav-pots.svg" },
    {
        name: "Recurring bills",
        href: "/recurringBills",
        icon: "assets/images/icon-nav-recurring-bills.svg",
    },
];

function NavLinks() {
    return (
        <header
            className="flex justify-center lg:flex-col items-center gap-1 p-2 fixed left-0 bottom-0  
            w-full  border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl bg-[hsl(var(--grey-900))]
           lg:static lg:w-auto  lg:rounded-xl 
          lg:border lg:p-4"
        >
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex w-full h-[48px] grow items-center justify-center gap-2 rounded-md bg-inherit p-3 text-sm font-medium
                         hover:bg-sky-100 focus:bg-sky-100 text-white hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <Image
                            width={20}
                            height={20}
                            src={link.icon}
                            alt={""}
                        />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </header>
    );
}

export default NavLinks;
