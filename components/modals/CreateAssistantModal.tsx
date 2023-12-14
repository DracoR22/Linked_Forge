'use client'

import { useCreateAssistantModal } from "@/hooks/use-create-assistant-modal"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { useState } from "react"
import { LoaderButton } from "../ui/loader-button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const CreateAssistantModal = () => {

  const createAssistantModal = useCreateAssistantModal()
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')

  const onSubmit = async () =>{
    try {
        setIsLoading(true)
        await axios.post('/api/assistant', { name })
        createAssistantModal.onClose()
        router.refresh()
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
    <Dialog open={createAssistantModal.isOpen} onOpenChange={createAssistantModal.onClose}>
       <DialogContent>
        <DialogHeader>
         <DialogTitle>
           Create an assistant
         </DialogTitle>
         <div>
            Let&apos;s start by giving a name to your assistant
         </div>
        </DialogHeader>
          <div>
            <Input required id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}
            className="mt-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-0" placeholder="Your assistant name"/>
          </div>
          <DialogFooter>
            <div>
                <LoaderButton onClick={onSubmit} isLoading={isLoading} variant='purple'>
                    Create
                </LoaderButton>
            </div>
          </DialogFooter>
       </DialogContent>
    </Dialog>
  )
}

export default CreateAssistantModal