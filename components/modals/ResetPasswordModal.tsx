'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import useResetPasswordModal from "@/hooks/use-reset-password"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { LoaderButton } from "../ui/loader-button"

const ResetPasswordModal = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
 
    const router = useRouter()
    const { toast } = useToast()

    const { onClose, isOpen } = useResetPasswordModal()
 
    const onSubmit = async (e: any) => {
     e.preventDefault();
    try {
     setIsLoading(true)
     await axios.post("/api/send-reset-link", { email })
     toast({
         title: 'Confirmation email sent!',
         description: 'If you dont see any email from us, check your spam inbox'
     })
     router.refresh()
     router.push('/log-in')
     setEmail('')
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
                 Reset your password
             </DialogTitle>
             <div>
                Please type your email to send you a confirmation link
             </div>
         </DialogHeader>
         <Separator/>
         <div className="text-xs text-neutral-600">
           After getting your confirmation link, you will have 5 minutes to reset your password.
         </div>
         <form onSubmit={onSubmit}>
             <Input required type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
             className="focus-visible:ring-indigo-500 focus-visible:ring-offset-0 border-2 border-indigo-500"/>
              
             <div className="mt-6">
                 <LoaderButton isLoading={isLoading} variant='purple'>
                     Send 
                 </LoaderButton>
             </div>
         </form>
       </DialogContent>
     </Dialog>
   )
 }
 
 export default ResetPasswordModal