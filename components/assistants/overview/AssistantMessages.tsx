'use client'

import Hint from "@/components/Hint"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Mail } from "lucide-react"

interface AssistantMessagesProps {
    messages: number
}

const AssistantMessages = ({ messages }: AssistantMessagesProps) => {
  return (
    <Card>
    <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-semibold">
         Messages
      </CardTitle>
       {/* <Hint side="top" description="Free accounts can have up to 40 messages at the time,
          but you can still delete recent messages from your assistant messages page.
           For unlimited messages upgrade to Pro account">
           <HelpCircle className="hidden lg:flex h-[14px] w-[14px] -ml-12 xl:-ml-16 mb-2 text-muted-foreground"/>
        </Hint> */}
      <Mail className="h-4 w-4 text-muted-foreground"/>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-indigo-500">
          +{messages}
        </div>
    </CardContent>
</Card>
  )
}

export default AssistantMessages