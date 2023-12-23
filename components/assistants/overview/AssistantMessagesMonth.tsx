'use client'

import Hint from "@/components/Hint"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, HelpCircle } from "lucide-react"

interface AssistantMessagesMonthProps {
    messages: number
}

const AssistantMessagesMonth = ({ messages }: AssistantMessagesMonthProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">
          This month messages
        </CardTitle>
       <Hint side="top" description="Free accounts have a limit of 50 messages per month.
           For for more messages upgrade to Pro account">
           <HelpCircle className="hidden xl:flex h-[14px] w-[14px] -ml-10  mb-2 text-muted-foreground"/>
        </Hint>
      <Calendar className="h-4 w-4 text-muted-foreground"/>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-indigo-500">
          {messages}
          {/* {messages >= 4 && <div>'you ran out of messages!'</div>} */}
        </div>
    </CardContent>
</Card>
  )
}

export default AssistantMessagesMonth