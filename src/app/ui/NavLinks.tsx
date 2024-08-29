"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import OverviewSvg from "../components/overview.svg";
import TransactionsSvg from "../components/transactions.svg";
import BudgetsSvg from "../components/budget.svg";
import PotsSvg from "../components/pots.svg";
import RecurringBillsSvg from "../components/recurring.svg";

const links = [
    {
        name: "Overview",
        href: "/",
        Icon: <OverviewSvg className="fill-current" />,
    },
    {
        name: "Transactions",
        href: "/transactions",
        Icon: <TransactionsSvg className="fill-current" />,
    },
    {
        name: "Budgets",
        href: "/budgets",

        Icon: <BudgetsSvg className="fill-current" />,
    },
    {
        name: "Pots",
        href: "/pots",
        Icon: <PotsSvg className="fill-current" />,
    },
    {
        name: "Recurring bills",
        href: "/recurringBills",
        Icon: <RecurringBillsSvg className="fill-current" />,
    },
];

function NavLinks() {
    const pathname = usePathname();
    return (
        <header
            className="fixed left-0 bottom-0 w-full  border-b border-gray-300 pt-2 px-4 backdrop-blur-2xl
             bg-[hsl(var(--grey-900))] lg:static lg:w-auto lg:min-h-screen lg:border lg:p-4 rounded-t-lg lg:rounded-tl-none
             lg:rounded-r-2xl"
        >
            <div className="flex justify-center lg:flex-col items-center gap-1 ">
                {links.map((link) => {
                    const Icon = () => link.Icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                `flex w-full h-[44px] grow items-center justify-center gap-2 rounded-t-lg
                                bg-inherit p-3 text-sm font-medium text-white hover:text-[hsl(var(--green))] hover:bg-sky-100 
                                hover:border-[hsl(var(--green))]  focus:bg-sky-100 focus:text-[hsl(var(--green))]
                                 focus:border-[hsl(var(--green))] focus:outline-none md:justify-start md:p-2 md:px-3
                                 border-b-4 border-transparent `,
                                {
                                    "text-[hsl(var(--green))] text-blue-600":
                                        pathname === link.href,
                                }
                            )}
                        >
                            <Icon />
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    );
                })}
            </div>
        </header>
    );
}

export default NavLinks;
