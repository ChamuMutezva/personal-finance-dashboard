"use client";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const categories = [
    "All",
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
];

export default function CategoryFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCategory = event.target.value;
        
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (selectedCategory !== "All") {
            params.set("query", selectedCategory);
        } else {
            params.delete("query"); // Remove category filter if 'All' is selected
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="categories" className="sr-only sm:not-sr-only">
                Categories
            </label>

            <select
                id="categories"
                onChange={handleCategoryChange}
                className="border flex-1 rounded-md p-2"
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}
