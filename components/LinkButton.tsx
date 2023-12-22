'use client'

import useLinkAssistantModal from "@/hooks/use-link-assistant-modal"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useParams } from "next/navigation"

interface LinkButtonProps {
    instructions?: string | null
}

const LinkButton = ({ instructions }: LinkButtonProps) => {

    const { toast } = useToast()
    const { onOpen } = useLinkAssistantModal()
    const params = useParams()

  const onAction = () => {
    if (!instructions || instructions.trim() === '') {
        return toast({
            variant: 'destructive',
             description: 'Your assistant need instructions before you can start using it'
        })
    } else {
        return onOpen({assistantId: params.assistantId})
    }
  }

  return (
   <Button variant='purple' onClick={onAction}>
     Link Assistant
   </Button>
  )
}

export default LinkButton