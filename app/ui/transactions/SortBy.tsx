"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SortBy() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSortChange = (event: { target: { value: any } }) => {
        const selectedSort = event.target.value;
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", selectedSort); // Update the sortBy parameter
        params.set("page", "1"); // Reset to first page on sorting change
        replace(`${pathname}?${params.toString()}`);
    };

    const sortList = [
        "Latest",
        "Oldest",
        "A to Z",
        "Z to A",
        "Highest",
        "Lowest",
    ];

    //const [sortBy, setSortBy] = useState(sortList[0]);

    return (
        <div className="flex items-center">
            <label htmlFor="sort" className="sr-only sm:not-sr-only">
                Sort by
            </label>
            <select
                id="sort"               
                onChange={handleSortChange}
                className="border rounded-md p-2 flex-1"
            >
                {sortList.map((list, idx) => (
                    <option key={idx} value={list}>
                        {list}
                    </option>
                ))}
            </select>
        </div>
    );
}
