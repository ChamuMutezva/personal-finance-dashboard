import LoginForm from "../ui/login/login.form";
export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen w-full">
            <div className="relative  flex w-full max-w-[30rem] flex-col space-y-2.5 p-4 md:-mt-32">
                <LoginForm />
            </div>
        </main>
    );
}
