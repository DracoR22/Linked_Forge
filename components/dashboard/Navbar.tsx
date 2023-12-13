import Image from "next/image"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

const Navbar = ({ currentUser }: any) => {
  return (
    <nav className="fixed z-50 top-0 px-10 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
           LOGO
        </div>
            {/* <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2" variant="purple">
              Create
            </Button>

            <Button size="sm" className="rounded-sm block md:hidden" variant="purple">
              <Plus className="h-4 w-4"/>
            </Button> */}
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <Image className="rounded-full" height={40} width={40} alt="Avatar" src={currentUser.image || '/placeholder.jpg'}/>
        
      </div>
    </nav>
  )
}

export default Navbar