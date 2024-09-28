import React from "react";

import { fetchBudgetById, fetchBudgets } from "@/app/lib/data";

import EditForm from "@/app/ui/budget/EditForm";

export default async function Page({
    params,
}: Readonly<{ params: { id: string } }>) {
    const id = params.id;
    const [budget, budgets] = await Promise.all([
        fetchBudgetById(id),
        fetchBudgets(),
    ]);

    return  <EditForm id={budget.id} budgets={budgets} />;
}
