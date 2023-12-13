import Navbar from "@/components/marketing/Navbar"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full">
         <Navbar/>
         {children}
      </div>
    )
  }
  
  export default AuthLayout