"use client";

import React from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = {
  label: string;
  value: string;
  sortBy: string;
  sortDesc: boolean;
};

const sortOptions: SortOption[] = [
  { label: 'Latest', value: 'latest', sortBy: 'date', sortDesc: true },
  { label: 'Oldest', value: 'oldest', sortBy: 'date', sortDesc: false },
  { label: 'A to Z', value: 'aToZ', sortBy: 'name', sortDesc: false },
  { label: 'Z to A', value: 'zToA', sortBy: 'name', sortDesc: true },
  { label: 'Highest Amount', value: 'highestAmount', sortBy: 'amount', sortDesc: true },
  { label: 'Lowest Amount', value: 'lowestAmount', sortBy: 'amount', sortDesc: false },
];

export function SortSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      const params = new URLSearchParams(searchParams);
      params.set('sortBy', option.sortBy);
      params.set('sortDesc', option.sortDesc.toString());
      params.set('page', '1'); // Reset to first page when sorting changes
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

