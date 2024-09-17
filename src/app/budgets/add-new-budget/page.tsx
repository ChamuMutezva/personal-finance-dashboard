import React from "react";
import AddBudgetForm from "@/app/ui/AddBudgetForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default async function Page() {
    return (
        <main className="flex-1 flex min-h-screen flex-col items-center justify-between lg:p-24">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <AddBudgetForm />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
