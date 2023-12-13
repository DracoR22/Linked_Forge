import LogIn from "@/components/auth/LogIn"
import { getSession } from "next-auth/react"


const LoginPage = async () => {

  const session = await getSession()

  console.log(session?.user)

  return (
    <div>
        <LogIn/>
    </div>
  )
}

export default LoginPage