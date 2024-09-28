import React, { Suspense } from "react";

import { fetchBudgetById, fetchBudgets } from "@/app/lib/data";
import EditForm from "@/app/ui/budget/EditForm";
import { notFound } from "next/navigation";
import { SkeletonLoader } from "@/app/ui/transactions/TransactionTableSkeleton";

export default async function Page({
    params,
}: Readonly<{ params: { id: string } }>) {
    const id = params.id;
    const [budget, budgets] = await Promise.all([
        fetchBudgetById(id),
        fetchBudgets(),
    ]);

    if (!budget) {
        notFound();
    }

    return (
        <Suspense fallback={<SkeletonLoader />}>
            <EditForm id={budget.id} budgets={budgets} />
        </Suspense>
    );
}
