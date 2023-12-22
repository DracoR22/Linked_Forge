'use client'

import { HelpCircle, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Hint from "../Hint"

interface MessagesCountProps {
    messages: number
    isPro: boolean
}

const MessagesCount = ({ messages, isPro }: MessagesCountProps) => {
  return (
    <Card>
        <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            Total messages this month
          </CardTitle>
           <Hint side="top" description="Free accounts have a limit of 50 messages per month.
           For unlimited messages upgrade to Pro account">
               <HelpCircle className="hidden xl:flex h-[14px] w-[14px] -ml-6 mb-2 text-muted-foreground"/>
            </Hint>
          <Mail className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-indigo-500">
            {isPro ? `+${messages} / 10k` : `+${messages} / 50`}
            </div>
        </CardContent>
    </Card>
  )
}

export default MessagesCount