"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: Readonly<{ totalPages: number }>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="inline-flex w-full justify-center sm:justify-between">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
                text="Prev"
            />

            <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position:
                        | "first"
                        | "last"
                        | "single"
                        | "middle"
                        | undefined;

                    if (index === 0) position = "first";
                    if (index === allPages.length - 1) position = "last";
                    if (allPages.length === 1) position = "single";
                    if (page === "...") position = "middle";

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
                text="Next"
            />
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
}) {
    const className = clsx(
        "flex h-10 w-10 items-center justify-center text-sm border",
        {
            "rounded-l-md": position === "first" || position === "single",
            "rounded-r-md": position === "last" || position === "single",
            "z-10 bg-blue-600 border-blue-600 text-white": isActive,
            "hover:bg-gray-100": !isActive && position !== "middle",
            "text-gray-300": position === "middle",
        }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            <span className="sr-only">Page </span>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
    text,
}: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
    text: "Prev" | "Next";
}) {
    const className = clsx(
        "flex h-10 w-10 sm:w-24 items-center gap-4 justify-center rounded-md border",
        {
            "pointer-events-none text-gray-300": isDisabled,
            "hover:bg-gray-100": !isDisabled,
            "mr-2 md:mr-4": direction === "left",
            "ml-2 md:ml-4": direction === "right",
        }
    );

    const icon =
        direction === "left" ? (
            <ArrowLeftIcon className="w-4" />
        ) : (
            <ArrowRightIcon className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {direction === "right" && (
                <>
                    <span className="hidden sm:block">{text}</span>
                    <span className="sr-only">Page</span>
                </>
            )}
            {icon}
            {direction === "left" && (
                <>
                    <span className="hidden sm:block">{text}</span>
                    <span className="sr-only">Page</span>
                </>
            )}
        </Link>
    );
}
