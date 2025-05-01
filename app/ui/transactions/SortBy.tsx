"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowDownWideNarrow, Check, ChevronDown } from "lucide-react";
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

const sortOptions = [
    { value: "Latest", label: "Latest" },
    { value: "Oldest", label: "Oldest" },
    { value: "A to Z", label: "A to Z" },
    { value: "Z to A", label: "Z to A" },
    { value: "Highest", label: "Highest" },
    { value: "Lowest", label: "Lowest" },
];

export default function SortBy() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [open, setOpen] = useState(false);
    const currentSort = searchParams.get("sortBy") ?? "Latest";

    const handleSortSelect = (selectedValue: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", selectedValue);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
        setOpen(false);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only sm:not-sr-only">
                Sort by
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center gap-2">
                        {/* Mobile: Icon only */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden"
                            aria-label="Sort options"
                        >
                            <ArrowDownWideNarrow className="h-8 w-8" />
                        </Button>

                        {/* Desktop: Full combobox */}
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="hidden sm:flex w-[180px] justify-between"
                        >
                            {currentSort
                                ? sortOptions.find(
                                      (option) => option.value === currentSort
                                  )?.label
                                : "Sort by..."}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search sort..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No sort option found.</CommandEmpty>
                            <CommandGroup>
                                {sortOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            handleSortSelect(currentValue);
                                        }}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentSort === option.value
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
