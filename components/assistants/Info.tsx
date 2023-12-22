'use client'

import { CreditCard } from "lucide-react"
import Image from "next/image"
import Hint from "../Hint"

interface InfoProps {
  assistant: any
}

const Info = ({ assistant }: InfoProps) => {
  return (
    <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Image fill src={assistant?.image?.url ? assistant?.image?.url : '/linkedforge.svg'} alt="Assistant image" className="rounded-md object-cover"/>
        </div>
        <div className="space-y-1">
            <p className="font-semibold text-xl">
                {assistant.name}
            </p>
            <Hint side="top" sideOffset={10} description="You are currently in a free plan">
            <div className="flex items-center text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4 mr-1"/>
                Free
            </div>
            </Hint>
        </div>
    </div>
  )
}

export default Info