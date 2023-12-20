'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AssistantOverviewProps {
    data: any[]
}

const AssistantOverview = ({ data }: AssistantOverviewProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Messages Per Month
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
          <ResponsiveContainer width='100%' height={350}>
          <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
         </defs>
           <XAxis stroke='#888888' dataKey="name" fontSize={12} tickLine={false} axisLine={false}/>
           <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false}
          tickFormatter={(value) => `${value}`}/>
           <CartesianGrid strokeDasharray="3 3" />
           <Tooltip />
             <Area type="monotone" dataKey="messages" stroke="#667eea" fillOpacity={1} fill="url(#colorUv)" />
       </AreaChart>
         </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AssistantOverview