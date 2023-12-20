import getCurrentUserDashboard from "@/actions/get-current-user-dashboard"
import NavItem from "@/components/dashboard/NavItem"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import { ModalProvider } from "@/components/providers/ModalProvider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {

  const currentUserDashboard = await getCurrentUserDashboard();

    return (
      <main className="h-full">
         <ModalProvider/>
         <Navbar currentUser={currentUserDashboard}/>
         <div className="pt-20 md:pt-24 px-6 xl:mx-[100px]">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                  <Sidebar currentUser={currentUserDashboard}/>
                </div>
              {children}
            </div>
        </div>
      
      </main>
    )
  }
  
  export default PlatformLayout