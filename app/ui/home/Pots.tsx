import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { formatPosNegativeCurrency } from "@/lib/utils";
import { Pot } from "@/lib/definitions";

function PotsOverview({
    amountSavedInPots,
    pots,
}: Readonly<{
    amountSavedInPots: number;
    pots: Pot[];
}>) {
    return (
        <Card
            aria-label="pots"
            className="p-4 xl:col-span-7 xl:row-span-2 mb-4 xl:mb-0"
        >
            <div className="flex items-center justify-between pb-4">
                <h2
                    className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
                >
                    Pots
                </h2>
                <Link
                    href={`/dashboard/pots`}
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
            <div className="sm:flex gap-4">
                <Card className="flex flex-1 items-center p-5 gap-4 bg-[hsl(var(--beige-100))]">
                    <Image
                        src="assets/images/icon-pot.svg"
                        alt=""
                        width={28}
                        height={36}
                    />
                    <div>
                        <h3 className="text-preset-4 text-[hsl(var(--grey-500))]">
                            Total saved
                        </h3>
                        <p className="text-preset-1 text-[hsl(var(--grey-900))] font-bold">
                            {formatPosNegativeCurrency(amountSavedInPots)}
                        </p>
                    </div>
                </Card>

                <div className="grid flex-1 grid-cols-2 gap-2 m-4">
                    {pots.slice(0, 4).map((pot) => (
                        <div key={pot.id} className="relative">
                            <h3>{pot.name}</h3>
                            <p>{formatPosNegativeCurrency(pot.total)}</p>
                            <span
                                className="absolute rounded-sm"
                                style={{
                                    width: "5px",
                                    height: "100%",
                                    top: 0,
                                    left: "-1rem",
                                    backgroundColor: pot.theme,
                                }}
                            ></span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default PotsOverview;