"use client";
import React, { useState } from "react";
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
    const [minimize, setMinimize] = useState(false);
    return (
        <header
            className={clsx(
                `sidebar fixed z-10 left-0 bottom-0  border-b border-gray-300 pt-2 px-4 backdrop-blur-2xl w-full
             bg-[hsl(var(--grey-900))] lg:static lg:min-h-screen lg:border lg:pt-4 lg:px-0 rounded-t-lg lg:rounded-tl-none
             lg:rounded-r-2xl lg:flex lg:flex-col justify-start items-center transition-all duration-300 lg:pb-4`,
                {
                    "lg:w-[18.75rem]": !minimize,
                    "lg:w-[5rem]": minimize,
                }
            )}
        >
            <div
                className={clsx(`hidden lg:block py-8 w-full lg:pr-6`, {
                    "m-auto": minimize,
                    "mx-0": !minimize,
                })}
            >
                <Link
                    href={"/"}
                    aria-label="home page"
                    className={clsx(
                        `w-full hover:outline-dashed hover:outline-1 hover:outline-[hsl(var(--white))] hover:outline-offset-[0.35em] 
                     focus:outline-dashed focus:outline-1 focus:outline-[hsl(var(--white))] focus:outline-offset-[0.35em] p-1
                     flex  items-center`,
                        {
                            "justify-center": minimize,
                            "justify-start": !minimize,
                            "lg:pl-6": !minimize,
                        }
                    )}
                >
                    {minimize ? (
                        <Image
                            alt=""
                            width={14}
                            height={22}
                            src="assets/images/logo-small.svg"
                            priority
                        />
                    ) : (
                        <Image
                            alt=""
                            width={122}
                            height={22}
                            src="assets/images/logo-large.svg"
                            priority
                        />
                    )}
                </Link>
            </div>
            <div className="flex justify-center w-full lg:flex-col items-center lg:justify-start gap-1 lg:min-h-[23.5rem] lg:pr-6">
                {links.map((link) => {
                    const Icon = () => link.Icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                `flex w-full h-[32px] items-center justify-center gap-4 rounded-t-lg lg:rounded-t-none lg:rounded-r-xl
                                bg-inherit text-sm font-medium text-white hover:text-[hsl(var(--green))] hover:bg-sky-100 
                                hover:border-[hsl(var(--green))]  focus:bg-sky-100 focus:text-[hsl(var(--grey))]
                                 focus:border-[hsl(var(--green))] focus:outline-none p-2 lg:py-7
                                 border-b-4 lg:border-b-0 lg:border-l-4 border-transparent `,
                                {
                                    "text-[hsl(var(--green))] text-blue-600":
                                        pathname === link.href,
                                    "lg:pl-6": !minimize,
                                    "md:justify-start": !minimize,
                                }
                            )}
                        >
                            <Icon />
                            <span
                                className={clsx(
                                    `text-base hidden md:block`,
                                    {
                                        "lg:sr-only": minimize,
                                    }
                                )}
                            >
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <div className="minimise hidden lg:block mt-auto w-full lg:pr-6">
                <button
                    type="button"
                    onClick={() => setMinimize(!minimize)}
                    className={clsx(
                        `flex  items-center gap-1 p-1
                     hover:outline-dashed hover:outline-1 hover:outline-[hsl(var(--white))] hover:outline-offset-[0.35em] 
                     focus:outline-dashed focus:outline-1 focus:outline-[hsl(var(--white))] focus:outline-offset-[0.35em] w-full`,
                        {
                            "justify-start": !minimize,
                            "justify-center": minimize,
                            "lg:pl-6": !minimize,
                        }
                    )}
                >
                    <Image
                        src={"assets/images/icon-minimize-menu.svg"}
                        alt=""
                        width={20}
                        height={20}
                        priority
                        className={clsx({
                            "rotate-0": !minimize, // Rotate 180 degrees when minimize is false
                            "rotate-180": minimize, // Rotate back to 0 degrees when minimize is true
                        })}
                    />
                    <span
                        className={clsx(`text-[hsl(var(--white))]`, {
                            "lg:sr-only": minimize,
                        })}
                    >
                        Minimise menu
                    </span>
                </button>
            </div>
        </header>
    );
}

export default NavLinks;
