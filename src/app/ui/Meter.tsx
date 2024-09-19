// Meter.jsx
import React from "react";

const Meter = ({
    value,
    min = 0,
    max,
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
            <label className="sr-only" htmlFor="category-meter">Category Level</label>
            <meter
                id="category-meter"
                value={value}
                min={min}
                max={max}
                aria-labelledby="category-level-description category-usage"
                className={`h-6 w-full bg-[${color}]  rounded`}
            />

            <span id="category-level-description" className="sr-only">
                {value} dollars used out of {max} dollars budgeted , which is{" "}
                {percentage} usage.
            </span>
            {/*
            <div
                className={`absolute top-0 left-0 h-full bg-[${color}] rounded`}
                style={{ width: `${percentage < 100 ? percentage : 100}%`, backgroundColor: color }}
            />
            <span className="absolute left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                {value}
            </span>
            */}
        </div>
    );
};

export default Meter;
