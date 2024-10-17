import Link from "next/link";
import Image from "next/image";
import React from "react";

function PotsHeader() {
    return (
        <div className="flex items-center justify-between pb-4">
            <h2
                className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
            >
                Pots
            </h2>
            <Link
                href={`/pots`}
                className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
            >
                See all <span className="sr-only">list of pots</span>
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

export default PotsHeader;
