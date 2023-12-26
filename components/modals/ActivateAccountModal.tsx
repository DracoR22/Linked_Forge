'use client'

import useActivateAccountModal from "@/hooks/use-activate-account"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { LoaderButton } from "../ui/loader-button"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const ActivateAccountModal = () => {

   const [activationCode, setActivationCode] = useState("")
   const [isLoading, setIsLoading] = useState(false)

   const { onClose, isOpen, data } = useActivateAccountModal()

   const { activationToken } = data

   const router = useRouter()
   const { toast } = useToast()

   const onSubmit = async (e: any) => {
    e.preventDefault();
   try {
    setIsLoading(true)
    await axios.post("/api/email-confirm", {activation_token: activationToken, activation_code: activationCode})
    toast({
        title: 'Account created!',
        description: 'Now login into your account to start creating assistants'
    })
    router.refresh()
    router.push('/log-in')
    onClose()
   } catch (error: any) {
    if (error.response) {
        const errorMessage = error.response.data || 'An error occurred';
        toast({
            variant: 'destructive',
            title: errorMessage
        })
    } else {
        console.error('Error:', error.message);
    } 
   } finally {
    setIsLoading(false)
}
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Activate your account
            </DialogTitle>
            <div>
               Please check your email for the activation code we&apos;ve sent you.
            </div>
        </DialogHeader>
        <Separator/>
        <div className="text-xs text-neutral-600">
          Your activation code will expire after 5 minutes for security reasons.
        </div>
        <form onSubmit={onSubmit}>
            <Input id="activationCode" name="activationCode" value={activationCode} onChange={(e) => setActivationCode(e.target.value)}
            className="focus-visible:ring-indigo-500 focus-visible:ring-offset-0 border-2 border-indigo-500"/>
             
            <div className="mt-6">
                <LoaderButton isLoading={isLoading} variant='purple'>
                    Activate Account
                </LoaderButton>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ActivateAccountModal