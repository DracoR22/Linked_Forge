import Navbar from "@/components/auth/Navbar"


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full">
         <Navbar/>
         <div className="mt-16">
           {children}
         </div>
      </div>
    )
  }
  
  export default AuthLayout