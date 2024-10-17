import React from "react";
import Link from "next/link";
import Image from "next/image";

function RecurringHeader() {
    return (
        <div className="flex items-center justify-between pb-4">
            <h2
                className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
            >
                Recurring bills
            </h2>
            <Link
                href={`/recurring-bills`}
                className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
            >
                See all <span className="sr-only">recurring bills</span>
                <Image
                    src="assets/images/icon-caret-right.svg"
                    alt=""
                    width={6}
                    height={11}
                />
            </Link>
        </div>
    );
}

export default RecurringHeader;
