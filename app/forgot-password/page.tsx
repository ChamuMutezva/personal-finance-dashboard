import ForgotPasswordForm from "@/app/ui/forgot-password/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot password",
};

export default function ForgotPasswordPage() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <ForgotPasswordForm />
        </main>
    );
}
