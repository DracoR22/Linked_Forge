'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

interface OverviewProps {
    data: any[]
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Usage Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
          <ResponsiveContainer width='100%' height={350}>
          <BarChart data={data}>
         <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false}/>
         <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false}
          tickFormatter={(value) => `${value}`}/>
          <Bar dataKey='total' fill='#667eea' radius={[4, 4, 0, 0]}/>
          </BarChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Overview