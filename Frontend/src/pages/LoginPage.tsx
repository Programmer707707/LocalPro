import LoginForm from "@/components/login/LoginForm"
import LoginInfo from "@/components/login/LoginInfo"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <LoginInfo/>
      <LoginForm/>
    </div>
  )
}