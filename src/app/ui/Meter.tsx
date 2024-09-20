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
            <label className="sr-only" htmlFor="category-meter">
                Category Level
            </label>
            
            <meter
                id="category-meter"
                value={value}
                min={min}
                max={max}
                aria-labelledby="category-level-description category-usage"
                className={`h-6 w-full rounded`}
                style={{backgroundColor: color}}
            />

            <span id="category-level-description" className="sr-only">
                {value} dollars used out of {max} dollars budgeted , which is{" "}
                {percentage} usage.
            </span>
          
        </div>
    );
};

export default Meter;
