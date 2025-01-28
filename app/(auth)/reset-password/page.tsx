import { ResetPasswordForm } from "../../ui/reset-password/ResetPasswordForm"

export default function ResetPasswordPage({
  searchParams,
}: Readonly<{
  searchParams: { token: string }
}>) {
  const { token } = searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <ResetPasswordForm token={token} />
    </div>
  )
}

