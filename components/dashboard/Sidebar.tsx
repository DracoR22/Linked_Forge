'use client'

import { LayoutDashboard, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import { useCreateAssistantModal } from "@/hooks/use-create-assistant-modal"
import { Accordion } from "../ui/accordion"
import { useLocalStorage } from "usehooks-ts"
import NavItem from "./NavItem"

interface SidebarProps {
  storageKey?: string
  currentUser: any
}

const Sidebar = ({ storageKey = "c-sidebar-state", currentUser }: SidebarProps) => {

  const pathname = usePathname()
  const createAssistantModal = useCreateAssistantModal()

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
        acc.push(key)
    }

    return acc
  }, [])

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
        ...curr,
        [id]: !expanded[id]
    }))
  }
 
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

        <Button onClick={() => createAssistantModal.onOpen()} type="button" size="icon" variant="ghost" className="ml-auto">
              <Plus className="h-4 w-4"/>
        </Button>
    </div>

    <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
      {currentUser.assistants.length > 0 && currentUser.assistants.map((assistant: any) => (
        <NavItem key={assistant.id} isActive={pathname === assistant.id} isExpanded={expanded[assistant.id]} onExpand={onExpand} assistant={assistant}/>
      ))}
    </Accordion>
    </>
  )
}

export default Sidebar