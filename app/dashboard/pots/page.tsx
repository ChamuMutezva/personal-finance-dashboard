import React from "react";
import { fetchPots } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddPotForm from "../../ui/pots/AddPotForm";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeletePot } from "../../ui/pots/DeletePotForm";
import MeterPots from "../../ui/pots/MeterPots";
import EditPotForm from "../../ui/pots/EditPotForm";
import AddMoneyToPotForm from "../../ui/pots/AddMoneyToPotForm";
import WithDrawFromPot from "../../ui/pots/WithdrawFromPot";
import SignOutForm from "@/app/ui/SignOutForm";

export default async function Page() {
    const pots = await fetchPots();

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-4">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Pots
                </h1>
                <SignOutForm />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            className={`focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                        >
                            + Add New Pot <span className="sr-only">item</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Pot</DialogTitle>
                            <DialogDescription>
                                Create a pot to set savings targets. These can
                                help you on track as you save for special
                                purchases
                            </DialogDescription>
                        </DialogHeader>
                        <AddPotForm pots={pots} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className={`grid gap-4 lg:grid-cols-2`}>
                {pots.map((pot) => (
                    <Card
                        key={pot.id}
                        className="rounded-xl py-6 px-5 flex-1 flex flex-col gap-4"
                    >
                        <div className="flex justify-between items-center relative">
                            <h2
                                className={`flex justify-center items-center gap-4 relative`}
                            >
                                <span
                                    className={`w-4 h-4 inline-block rounded-full`}
                                    style={{
                                        backgroundColor: pot.theme,
                                    }}
                                />
                                <span className="text-preset-2 font-bold ">
                                    {pot.name}
                                </span>
                            </h2>
                            <Popover>
                                <PopoverTrigger
                                    className={`p-2 focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                            hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                                >
                                    <Image
                                        src="/assets/images/icon-ellipsis.svg"
                                        alt=""
                                        width={14}
                                        height={4}
                                    />
                                </PopoverTrigger>
                                <PopoverContent className="flex relative flex-col gap-2 w-[134px] h-[91px] mr-8">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"secondary"}
                                                className="p-0 m-0 bg-inherit text-[hsl(var(--grey-900))]
                                                         focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                          hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4"
                                            >
                                                Edit pot
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit {pot.name}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    If your saving targets
                                                    change, feel free to update
                                                    your pots
                                                </DialogDescription>
                                            </DialogHeader>
                                            <EditPotForm
                                                id={pot.id}
                                                pots={pots}
                                            />
                                        </DialogContent>
                                    </Dialog>

                                    <Separator />

                                    {/*DELETE DIALOG*/}
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className="text-preset-4 m-0 p-0 bg-inherit text-[hsl(var(--red))]
                                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                          hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4"
                                        >
                                            Delete Pot
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Delete
                                                    {` '${pot.name}'`}?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to
                                                    delete this Pot? This action
                                                    cannot be reversed and the
                                                    data in it will be removed
                                                    forever
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    No, Go Back
                                                </AlertDialogCancel>

                                                <DeletePot pot={pot} />
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p
                            className={`text-preset-4 text-[hsl(var(--grey-500))] font-normal`}
                        >
                            Total saved ${pot.total}
                        </p>
                        <MeterPots
                            value={pot.total}
                            min={0}
                            max={pot.target}
                            color={pot.theme}
                        />
                        <p
                            id="meter-usage"
                            className="flex justify-between items-center"
                        >
                            <span>
                                {((pot.total / pot.target) * 100).toFixed(2)}%
                            </span>{" "}
                            <span>Target of ${pot.target}</span>
                        </p>
                        <div className="flex justify-between items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className={`focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                     hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4 font-bold`}
                                    >
                                        + Add Money{" "}
                                        <span className="sr-only">to pot</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add to {`'${pot.name}'`}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Add money to your pot to keep it
                                            separate from your main balance. As
                                            soon as you add this money, it will
                                            be deducted from your current
                                            balance
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AddMoneyToPotForm pot={pot} />
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className={`focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4 font-bold`}
                                    >
                                        Withdraw Money{" "}
                                        <span className="sr-only">
                                            from pot
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Withdraw from {`'${pot.name}'`}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Withdraw from your pot to put money
                                            back in your main balance. This will
                                            reduce the amount you have in this
                                            pot.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <WithDrawFromPot pot={pot} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </Card>
                ))}
            </div>
        </main>
    );
}
