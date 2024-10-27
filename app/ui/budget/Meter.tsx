// Meter.jsx
import React from "react";

const Meter = ({
    value = 0,
    min = 0,
    max = 0,
    color,
}: {
    value: number;
    min: number;
    max: number;
    color: string;
}) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="relative w-full rounded flex flex-col">
            <div className={`h-6 w-full bg-[hsl(var(--grey-100))] rounded`}>
                <div
                    id="category-meter"
                    role="meter"
                    aria-valuenow={value}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-label="budget meter"
                    aria-labelledby="meter-usage"
                    className={`h-6 rounded`}
                    style={{
                        backgroundColor:
                            percentage > 100 ? `hsl(var(--red))` : color,
                        width: `${percentage > 100 ? 100 : percentage}%`,
                        transition: "width 0.3s ease-in-out",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Meter;
