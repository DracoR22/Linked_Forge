'use client'

import useLinkAssistantModal from "@/hooks/use-link-assistant-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import Hint from "../Hint"

const LinkAssistantModal = () => {

    const [copied, setCopied] = useState(false)

    const onCopyToClipboard = (s: string) => {
      navigator.clipboard.writeText(s)
      setCopied(true)
  
      setTimeout(() => {
         setCopied(false)
      }, 1000)
    }
  

    const { onClose, isOpen, data } = useLinkAssistantModal()

    const { assistantId } = data

    const linkCode = `<script data-ai-id="${assistantId}" src="https://linkedforgeai.com/widget.js"></script>`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Link your assistant
            </DialogTitle>
            <div>
                Add assistant to your website
            </div>
        </DialogHeader>
        <Separator />
        <div>
          <h3 className="mb-3">
            Paste this code in the &lt;head&gt; section of your website
          </h3>
          <div className="bg-neutral-200 rounded-md w-full h-[130px] flex text-sm">
             <p className="px-4 flex items-center">
             &lt;script <br/> data-ai-id=&quot;{assistantId}&quot; src=&quot;https://linkedforgeai.com/widget.js&quot;&gt; <br/>
             &lt;/script&gt;
             </p>
             <div className="flex items-end cursor-pointer mb-3 mr-3" onClick={() => onCopyToClipboard(linkCode)}>
             <Hint side="top" sideOffset={10} description="Copy to clipboard">
                 {copied ? <Check/> : <Copy/>}
             </Hint>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LinkAssistantModal