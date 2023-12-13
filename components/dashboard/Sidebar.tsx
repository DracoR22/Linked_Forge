'use client'

import { LayoutDashboard, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

const Sidebar = () => {

  const pathname = usePathname()

  return (
    <>
    <div className={cn("font-medium cursor-pointer text-xs flex items-center -mt-6 mb-1 hover:bg-indigo-500/10 rounded-sm transition")}> 
       <span className="pl-4">
            Dashboard
        </span>

        <Button type="button" size="icon" variant="none" className="ml-auto">
              <LayoutDashboard className="h-4 w-4"/>
        </Button>
    </div>
     <Separator/>
    <div className="font-medium text-xs flex items-center my-1">
       <span className="pl-4">
            Assistants
        </span>

        <Button type="button" size="icon" variant="ghost" className="ml-auto">
              <Plus className="h-4 w-4"/>
        </Button>
    </div>
    </>
  )
}

export default Sidebar