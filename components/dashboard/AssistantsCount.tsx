'use client'

import { Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface AssistantsCountProps {
    assistants: number
}

const AssistantsCount = ({ assistants }: AssistantsCountProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">
          Total Assistants
        </CardTitle>
      <Bot className="h-4 w-4 text-muted-foreground"/>
     </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-indigo-500">
          +{assistants}
        </div>
     </CardContent>
</Card>
  )
}

export default AssistantsCount