'use client'

import useDeleteMessageModal from "@/hooks/use-delete-message-modal"
import { useParams, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { LoaderButton } from "../ui/loader-button"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { useState } from "react"
import useDeleteAssistantModal from "@/hooks/use-delete-assistant-modal"
import { Separator } from "../ui/separator"

const DeleteAssistantModal = () => {

 const router = useRouter()

 const { onClose, isOpen, data } = useDeleteAssistantModal()

 const { assistantId, assistantName } = data

 const params = useParams()
 const { toast } = useToast()

 const [isLoading, setIsLoading] = useState(false)

 const handleDelete = async () => {
  setIsLoading(true)
  try {
    await axios.patch(`/api/assistant/${params.assistantId}/delete`)
    toast({
     title: `${assistantName} has been deleted`
    })
   router.push('/dashboard')
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
            Are you sure you want to delete {assistantName}?
          </DialogTitle>
          <div>
            You won&apos;t be able to get it back!
         </div>
        </DialogHeader>
        <Separator/>
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

export default DeleteAssistantModal