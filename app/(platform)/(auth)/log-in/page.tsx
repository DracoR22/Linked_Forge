import LogIn from "@/components/auth/LogIn"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const LoginPage = async () => {

  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div>
        <LogIn/>
    </div>
  )
}

export default LoginPage