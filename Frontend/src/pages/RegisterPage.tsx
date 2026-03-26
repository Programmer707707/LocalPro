import RegisterInfo from "@/components/register/RegisterInfo"
import RegisterForm from "@/components/register/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <RegisterInfo />
      <RegisterForm />
    </div>
  )
}