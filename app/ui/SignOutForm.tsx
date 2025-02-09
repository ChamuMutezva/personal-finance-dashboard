"use server";

import { PowerIcon } from "@heroicons/react/24/outline";
//import { signOut } from "@/auth";
import { logout } from "@/lib/actionsAuth";

export default async function SignOutForm() {
    return (
        <div className="flex h-full flex-col px-3 md:px-2">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form
                    action={async () => {
                        "use server";
                        await logout();
                    }}
                >
                    <button
                        type="submit"
                        aria-label="sign out"
                        className="flex h-[36px]  grow items-center justify-center gap-2 rounded-md
                         bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 
                          dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400
                          md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <PowerIcon className="w-4 lg:w-6" />
                        <span className="sr-only">Sign Out</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
