'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { useManageSubscriptionModal } from "@/hooks/use-manage-subscription-modal"
import { Separator } from "../ui/separator"
import SubscriptionButton from "../SubscriptionButton"

const ManageSubscriptionModal = () => {

    const { onClose, isOpen, data } = useManageSubscriptionModal()

    const {isPro} = data

    const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent>
         <DialogHeader>
            <DialogTitle>
                {isPro && "You are a Pro member"}
                {!isPro && "You are a Free member"}
            </DialogTitle>
         </DialogHeader>
         <Separator/>
         <div>
            <p className="text-sm text-neutral-600">
               {isPro && "If you cancel your plan, you can still use LinkedForgeAI Pro features until your current plan expires"}
               {!isPro && "You are currently in a free plan. Become a Pro and unlock the full potential of AI on your website!"}
            </p>

            <div className="mt-4">
               <SubscriptionButton isPro={isPro}/>
            </div>
         </div>
       </DialogContent>
    </Dialog>
  )
}

export default ManageSubscriptionModal