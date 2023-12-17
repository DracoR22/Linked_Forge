import SignUp from "@/components/auth/SignUp"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const SignUpPage = async () => {

  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default SignUpPage