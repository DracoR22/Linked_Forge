'use client'

import { Layout, Mail, PenSquare, Settings } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "../ui/button"

interface Assistant {
    id: string
    name: string
}

interface NavItemProps {
    isExpanded: boolean
    isActive: boolean
    assistant: Assistant
    onExpand: (id: string) => void
}

const NavItem = ({ isExpanded, assistant, onExpand, isActive }: NavItemProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const routes = useMemo(() => [
        {
            label: 'Overview',
            href: `/dashboard/${assistant.id}`,
            icon: <Layout className="h-4 w-4 mr-2"/>,
            active: pathname === `/dashboard/${assistant.id}`
        },
        {
            label: 'Messages',
            href: `/dashboard/${assistant.id}/messages`,
            icon: <Mail className="h-4 w-4 mr-2"/>,
            active: pathname === `/dashboard/${assistant.id}/messages`
        },
        {
            label: 'Customize',
            href: `/dashboard/${assistant.id}/customize`,
            icon: <PenSquare className="h-4 w-4 mr-2"/>,
            active: pathname === `/dashboard/${assistant.id}/customize`
        },
        {
            label: 'Settings',
            href: `/dashboard/${assistant.id}/settings`,
            icon: <Settings className="h-4 w-4 mr-2"/>,
            active: pathname === `/dashboard/${assistant.id}/settings`
        },
        
    ], [pathname])

    const onClick = (href: string) => {
        router.push(href)
    }

  return (
    <AccordionItem value={assistant.id} className="border-none">
      <AccordionTrigger onClick={() => onExpand(assistant.id)} className={cn("flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline", isActive && !isExpanded && "bg-indigo-500/10 text-indigo-700")}>
        <div className="flex items-center gap-x-2">
           <div className="w-7 h-7 relative">
           <Image fill src={'/linkedforge.svg'} alt="Organization" className="rounded-sm object-cover"/>
           </div>
           <span className="font-medium text-sm">
                {assistant.name}
           </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-nutral-700">
         {routes.map((route) => (
            <Button key={route.href} onClick={() => onClick(route.href)} className={cn("w-full font-normal justify-start pl-10 mb-1", pathname === route.href && "bg-indigo-500/10 text-indigo-700")} variant="ghost">
                {route.icon}
                {route.label}
            </Button>
         ))}
       </AccordionContent>
    </AccordionItem>
  )
}

export default NavItem