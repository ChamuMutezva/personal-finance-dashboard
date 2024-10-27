"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import OverviewSvg from "../../components/overview.svg";
import TransactionsSvg from "../../components/transactions.svg";
import BudgetsSvg from "../../components/budget.svg";
import PotsSvg from "../../components/pots.svg";
import RecurringBillsSvg from "../../components/recurring.svg";

const links = [
    {
        name: "Overview",
        href: "/dashboard",
        Icon: <OverviewSvg className="fill-current" />,
    },
    {
        name: "Transactions",
        href: "/dashboard/transactions",
        Icon: <TransactionsSvg className="fill-current" />,
    },
    {
        name: "Budgets",
        href: "/dashboard/budgets",

        Icon: <BudgetsSvg className="fill-current" />,
    },
    {
        name: "Pots",
        href: "/dashboard/pots",
        Icon: <PotsSvg className="fill-current" />,
    },
    {
        name: "Recurring bills",
        href: "/dashboard/recurring-bills",
        Icon: <RecurringBillsSvg className="fill-current" />,
    },
];

function NavLinks() {
    const pathname = usePathname();
    const [minimize, setMinimize] = useState(false);
    return (
        <header
            className={clsx(
                `sidebar fixed z-10 left-0 bottom-0 border-solid border-gray-300 pt-2 px-4 backdrop-blur-2xl w-full
             bg-[hsl(var(--grey-900))] lg:static lg:h-screen lg:border lg:pt-4 lg:px-0 rounded-t-lg lg:rounded-tl-none
             lg:rounded-r-2xl lg:flex lg:flex-col justify-start items-center transition-all duration-300 lg:pb-4`,
                {
                    "lg:w-[18.75rem]": !minimize,
                    "lg:w-[5rem]": minimize,
                }
            )}
        >
            <div
                className={clsx(`hidden lg:block w-full`, {
                    "m-auto lg:pr-1": minimize,
                    "mx-0 py-8 lg:pr-6": !minimize,
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
                            "justify-start lg:pl-6": !minimize,
                        }
                    )}
                >
                    {minimize ? (
                        <Image
                            alt=""
                            width={14}
                            height={22}
                            src="/assets/images/logo-small.svg"
                            priority
                        />
                    ) : (
                        <Image
                            alt=""
                            width={122}
                            height={22}
                            src="/assets/images/logo-large.svg"
                            priority
                        />
                    )}
                </Link>
            </div>
            <div
                className={clsx(
                    `flex justify-center w-full lg:flex-col items-center lg:justify-start gap-1 lg:min-h-[23.5rem]`,
                    {
                        "lg:pr-6": !minimize,
                        "lg:pr-1": minimize,
                    }
                )}
            >
                {links.map((link) => {
                    const Icon = () => link.Icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                `flex w-full h-[32px] items-center justify-center gap-4 rounded-t-lg lg:rounded-l-none lg:rounded-r-xl
                                bg-inherit text-sm font-medium text-white hover:text-[hsl(var(--green))] hover:bg-sky-100 
                                hover:border-[hsl(var(--green))]  focus:bg-sky-100 focus:text-[hsl(var(--green))]
                                 focus:border-[hsl(var(--green))] focus:outline-none px-2 py-5 lg:py-7 
                                 border-b-4 lg:border-b-0 lg:border-l-4 border-transparent `,
                                {
                                    "text-[hsl(var(--green))] text-blue-600":
                                        pathname === link.href,
                                    "md:justify-start lg:pl-6": !minimize,
                                }
                            )}
                        >
                            <Icon />
                            <span
                                className={clsx(`text-base hidden md:block`, {
                                    "lg:sr-only": minimize,
                                })}
                            >
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <div
                className={clsx(`hidden lg:block mt-auto w-full`, {
                    "lg:pr-6": !minimize,
                })}
            >
                <button
                    type="button"
                    onClick={() => setMinimize(!minimize)}
                    className={clsx(
                        `flex  items-center gap-1 p-1
                     hover:outline-dashed hover:outline-1 hover:outline-[hsl(var(--white))] hover:outline-offset-[0.35em] 
                     focus:outline-dashed focus:outline-1 focus:outline-[hsl(var(--white))] focus:outline-offset-[0.35em] w-full`,
                        {
                            "justify-start lg:pl-6": !minimize,
                            "justify-center lg:pr-1": minimize,
                        }
                    )}
                >
                    <Image
                        src={"/assets/images/icon-minimize-menu.svg"}
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
