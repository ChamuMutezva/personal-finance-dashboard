"use client";

import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    sortBy: "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest";
}

export function DataTable<TData, TValue>({
    columns,
    data,
    sortBy,
}: Readonly<DataTableProps<TData, TValue>>) {
    const sortMapping = {
        Latest: [{ id: "date", desc: true }],
        Oldest: [{ id: "date", desc: false }],
        "A to Z": [{ id: "name", desc: false }],
        "Z to A": [{ id: "name", desc: true }],
        Highest: [{ id: "amount", desc: true }],
        Lowest: [{ id: "amount", desc: false }],
    };

    const [sorting, setSorting] = useState(sortMapping[sortBy] || []);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setSorting(sortMapping[sortBy] || []);
    }, [sortBy]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    });

    if (!isClient) {
        return (
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="p-1">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                </Table>
            </div>
        );
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto my-2">
                        <span className="sr-only">Select</span>Columns{" "}
                        <span className="sr-only">to visually display</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="rounded-md border">
                {/* Mobile View - Outside the table */}
                <div className="sm:hidden">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const cells = row.getVisibleCells();
                            const firstColumnCell = cells[0];
                            const nameCell = cells.find(
                                (cell) => cell.column.id === "name"
                            );
                            const categoryCell = cells.find(
                                (cell) => cell.column.id === "category"
                            );
                            const amountCell = cells.find(
                                (cell) => cell.column.id === "amount"
                            );
                            const dateCell = cells.find(
                                (cell) => cell.column.id === "date"
                            );
                            const lastColumnCell = cells[cells.length - 1];

                            return (
                                <div
                                    key={`mobile-${row.id}`}
                                    className="border-b p-2"
                                >
                                    <div className="flex">
                                        <div className="w-1/4 p-1">
                                            {flexRender(
                                                firstColumnCell.column.columnDef
                                                    .cell,
                                                firstColumnCell.getContext()
                                            )}
                                        </div>
                                        <div className="w-2/4 p-1">
                                            <div className="flex flex-col">
                                                {nameCell && (
                                                    <div className="font-medium">
                                                        {flexRender(
                                                            nameCell.column
                                                                .columnDef.cell,
                                                            nameCell.getContext()
                                                        )}
                                                    </div>
                                                )}
                                                {categoryCell && (
                                                    <div className="text-sm text-muted-foreground">
                                                        {flexRender(
                                                            categoryCell.column
                                                                .columnDef.cell,
                                                            categoryCell.getContext()
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-1/4 p-1">
                                            <div className="flex flex-col">
                                                {amountCell && (
                                                    <div className="font-medium">
                                                        {flexRender(
                                                            amountCell.column
                                                                .columnDef.cell,
                                                            amountCell.getContext()
                                                        )}
                                                    </div>
                                                )}
                                                {dateCell && (
                                                    <div className="text-sm text-muted-foreground">
                                                        {flexRender(
                                                            dateCell.column
                                                                .columnDef.cell,
                                                            dateCell.getContext()
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-1">
                                            {flexRender(
                                                lastColumnCell.column.columnDef
                                                    .cell,
                                                lastColumnCell.getContext()
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="h-24 text-center p-4">No results.</div>
                    )}
                </div>

                {/* Desktop View - Proper table structure */}
                <Table className="hidden sm:table">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="p-1">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="p-1"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
        </div>
    );
}
