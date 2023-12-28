'use client'

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "../ui/sheet"
import Sidebar from "./Sidebar"
import Link from "next/link"
import Image from "next/image"

const MobileSidebar = ({ currentUser }: any) => {

    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)
  
    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)
  
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
    useEffect(() => {
      onClose()
    }, [pathname, onClose])
  
    if(!isMounted) {
      return null
    }

  return (
    <>
    <Button onClick={onOpen} className="block md:hidden mr-2 -ml-6" variant="ghost" size="sm">
      <Menu className="h-6 w-6"/>
    </Button>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-2">
      <Link href={'/dashboard'} className="flex my-2 cursor-pointer ml-3">
           <Image src={'/ultimate.svg'} alt="LinkedForgeAi" width={500} height={500} className="w-[50px] rounded-full"/>
        </Link>
          <div className="mt-10">
          <Sidebar currentUser={currentUser} storageKey="t-sidebar-mobile-state"/>
          </div>
      </SheetContent>
    </Sheet>
  </>
  )
}

export default MobileSidebar