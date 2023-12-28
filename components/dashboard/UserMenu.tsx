'use client'

import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { CreditCard, Crown, LogOutIcon, Sparkles, User } from "lucide-react"
import { useManageSubscriptionModal } from "@/hooks/use-manage-subscription-modal"
import { signOut } from "next-auth/react"

interface UserMenuProps {
    currentUser: any
    isPro: boolean
}

const UserMenu = ({ currentUser, isPro }: UserMenuProps) => {
   
  const manageSubscriptionModal = useManageSubscriptionModal()
    
  const onClick = () => {
      manageSubscriptionModal.onOpen({ isPro })
  }


  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full outline-indigo-500">
          <Image className="rounded-full object-cover cursor-pointer" height={40} width={40} alt="Avatar" src={currentUser.image || '/placeholder.jpg'}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6">

            <DropdownMenuLabel className="truncate flex items-center gap-x-2">
            {isPro ? <Crown className="h-5 w-5 text-amber-500"/> : <User className="h-5 w-5 text-indigo-500"/>}
                {currentUser.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="flex items-center gap-x-2 cursor-pointer" onClick={onClick}>
                 <CreditCard className="h-5 w-5 text-indigo-500"/>
                  Manage subscription
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-x-2 cursor-pointer mt-1" onClick={() => signOut()}>
                <LogOutIcon className="h-5 w-5 text-indigo-500"/>
                 Log Out
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu