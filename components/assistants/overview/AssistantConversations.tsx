'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface AssistantConversationsProps {
    conversations: number
}

const AssistantConversations = ({ conversations }: AssistantConversationsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
       <CardTitle className="text-sm font-semibold">
         Conversations
       </CardTitle>
      <MessageSquare className="h-4 w-4 text-muted-foreground"/>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-indigo-500">
          +{conversations}
        </div>
    </CardContent>
</Card>
  )
}

export default AssistantConversations