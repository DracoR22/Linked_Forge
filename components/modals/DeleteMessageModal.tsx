'use client'

import useDeleteMessageModal from "@/hooks/use-delete-message-modal"
import { useParams, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { LoaderButton } from "../ui/loader-button"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { useState } from "react"

const DeleteMessageModal = () => {

 const router = useRouter()

 const { onClose, isOpen, data } = useDeleteMessageModal()

 const { messageId } = data

 const params = useParams()
 const { toast } = useToast()

 const [isLoading, setIsLoading] = useState(false)

 const handleDelete = async () => {
  setIsLoading(true)
  try {
    await axios.delete(`/api/assistant/${params.assistantId}/messages/${messageId}`)
   //  toast({
   //   title: 'Message deleted'
   //  })
   router.refresh()
   onClose()
  } catch (error: any) {
   const errorMessage = error.response.data || 'An error occurred';
   toast({
       variant: 'destructive',
       title: errorMessage
   })
  } finally {
    setIsLoading(false)
  }
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete this message?
          </DialogTitle>
          <div>
            You won&apos;t be able to get it back!
         </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <div className="flex-1">
            <LoaderButton variant='purple' onClick={handleDelete} isLoading={isLoading}>
               Delete
            </LoaderButton>
          </div>
          <div>
            <LoaderButton variant='outline' onClick={onClose}>
              Cancel
            </LoaderButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMessageModal