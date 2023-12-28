'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"
import SubscriptionButton from "../SubscriptionButton"
import UserMenu from "./UserMenu"
import MobileSidebar from "./MobileSidebar"

interface NavbarProps {
  currentUser?: any
  isPro: boolean
}

const Navbar = ({ currentUser, isPro }: NavbarProps) => {

  const { status } = useSession()

  if (status === 'loading') {
   return (
    <nav className="fixed z-50 top-0 px-10 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
           <Skeleton className="w-[50px] h-[50px] rounded-full"/>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="rounded-full h-10 w-10"/>
      </div>
    </nav>
   )
  }

  return (
    <nav className="fixed z-50 top-0 px-10 w-full  border-b shadow-sm bg-white flex items-center">
      <MobileSidebar currentUser={currentUser}/>
      <div className="flex items-center gap-x-4">
        <Link href={'/dashboard'} className="hidden md:flex my-2 cursor-pointer">
           <Image src={'/ultimate.svg'} alt="LinkedForgeAi" width={500} height={500} className="w-[50px] rounded-full"/>
        </Link>
            {!isPro && <SubscriptionButton isPro={isPro}/>}
            

            {/* <Button size="sm" className="rounded-sm block md:hidden" variant="purple">
              <Plus className="h-4 w-4"/>
            </Button>  */}
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <UserMenu currentUser={currentUser} isPro={isPro}/>
      </div>
    </nav>
  )
}

export default Navbar