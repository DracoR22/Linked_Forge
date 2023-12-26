import getCurrentUserDashboard from "@/actions/get-current-user-dashboard"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import { ModalProvider } from "@/components/providers/ModalProvider"
import { checkSubscription } from "@/lib/subscription"

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {

  const currentUserDashboard = await getCurrentUserDashboard();
  const isPro = await checkSubscription()

    return (
      <main className="h-full">
         <Navbar currentUser={currentUserDashboard} isPro={isPro}/>
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