"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Filter, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
] as const;

export default function CategoryFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [open, setOpen] = useState(false);
    const currentCategory = searchParams.get("query") ?? "All";

    const handleCategorySelect = (selectedCategory: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (selectedCategory !== "All") {
            params.set("query", selectedCategory);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
        setOpen(false);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="categories" className="sr-only sm:not-sr-only">
                Categories
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center gap-2">
                        {/* Mobile: Icon only */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden"
                            aria-label="Filter categories"
                        >
                            <Filter className="h-8 w-8" />
                        </Button>

                        {/* Desktop: Full combobox */}
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="hidden sm:flex w-[180px] justify-between"
                        >
                            {currentCategory}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search categories..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                        key={category}
                                        value={category}
                                        onSelect={() =>
                                            handleCategorySelect(category)
                                        }
                                    >
                                        {category}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentCategory === category
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
