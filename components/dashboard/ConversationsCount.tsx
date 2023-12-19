'use client'

import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface ConversationsCountProps {
    conversations: number
}

const ConversationsCount = ({ conversations }: ConversationsCountProps) => {
  return (
    <Card>
        <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            Total Conversations
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

export default ConversationsCount