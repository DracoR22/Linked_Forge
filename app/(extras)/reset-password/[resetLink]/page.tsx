import ResetPassword from "@/components/ResetPassword"
import Navbar from "@/components/auth/Navbar"


const ResetPasswordPage = ({ params }: { params: { resetLink: string }}) => {
  return (
    <div>
        <Navbar/>
        <ResetPassword resetLink={params.resetLink}/>
    </div>
  )
}

export default ResetPasswordPage