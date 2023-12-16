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
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import Hint from "../Hint"

interface SidebarProps {
  storageKey?: string
  currentUser: any
}

const Sidebar = ({ storageKey = "c-sidebar-state", currentUser }: SidebarProps) => {

  const pathname = usePathname()
  const createAssistantModal = useCreateAssistantModal()

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])

  // if(!isMounted) {
  //   return null
  // }

  if (!currentUser) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

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
       <span className="pl-4 flex-1">
            Assistants
        </span>

        <Hint sideOffset={20} side="top" description={`Create a new assistant`}>
           <div onClick={() => createAssistantModal.onOpen()} className="ml-auto hover:bg-indigo-500/10 p-3 rounded-md">
              <Plus className="h-4 w-4"/>
           </div>
        </Hint>
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