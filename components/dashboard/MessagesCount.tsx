'use client'

import { HelpCircle, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Hint from "../Hint"

interface MessagesCountProps {
    messages: number
}

const MessagesCount = ({ messages }: MessagesCountProps) => {
  return (
    <Card>
        <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            Total messages
          </CardTitle>
           <Hint side="top" description="Free accounts can have up to 40 messages at the time,
              but you can still delete recent messages from your assistant messages page.
               For unlimited messages upgrade to Pro account">
               <HelpCircle className="hidden lg:flex h-[14px] w-[14px] -ml-12 xl:-ml-16 mb-2 text-muted-foreground"/>
            </Hint>
          <Mail className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-indigo-500">
              +{messages} / 40
            </div>
        </CardContent>
    </Card>
  )
}

export default MessagesCount