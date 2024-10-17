import { formatPosNegativeCurrency } from "@/app/lib/utils";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Pot } from "@/app/lib/definitions";

function PotsMain({ pots }: { pots: Pot[] }) {
    const amountSavedInPots = pots.reduce((accumulator, pot) => {
        return Number(accumulator) + Number(pot.total);
    }, 0);
    return (
        <div className="sm:flex">
            <Card className="flex p-5 gap-4 flex-1 sm:items-center">
                <Image
                    src="assets/images/icon-pot.svg"
                    alt=""
                    width={36}
                    height={28}
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
            <div className="grid sm:grid-cols-2 gap-2 m-4 sm:mx-8 flex-1">
                {pots.map((pot) => (
                    <div key={pot.id} className="relative">
                        <h3>{pot.name}</h3>
                        <p>{formatPosNegativeCurrency(pot.total)}</p>
                        <span
                            className="absolute rounded-sm"
                            style={{
                                width: "4px",
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
    );
}

export default PotsMain;
