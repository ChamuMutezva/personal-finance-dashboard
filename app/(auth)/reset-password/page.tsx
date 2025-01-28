import ResetPasswordForm from "../../ui/reset-password/ResetPasswordForm"

export default function ResetPasswordPage({
  searchParams,
}: Readonly<{
  searchParams: { token: string }
}>) {
  const { token } = searchParams

  return (
    <main className="flex flex-col items-center justify-center relative lg:justify-around  min-h-screen  lg:flex-row w-full lg:p-4">    
      <ResetPasswordForm token={token} />
    </main>
  )
}

