import getCurrentUserDashboard from "@/actions/get-current-user-dashboard"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {

  const currentUser = await getCurrentUserDashboard()

    return (
      <main className="h-full ">
         <Navbar currentUser={currentUser}/>
         <div className="pt-20 md:pt-24 px-6 max-w-6xl 2xl:max-w-screen-xl">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                  <Sidebar/>
                </div>
              {children}
            </div>
        </div>
      </main>
    )
  }
  
  export default PlatformLayout