'use client'

import { CreditCard } from "lucide-react"
import Image from "next/image"

interface InfoProps {
  assistant: any
}

const Info = ({ assistant }: InfoProps) => {
  return (
    <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Image fill src={'/linkedforge.svg'} alt="Assistant image" className="rounded-md object-cover"/>
        </div>
        <div className="space-y-1">
            <p className="font-semibold text-xl">
                {assistant.name}
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
                <CreditCard className="h-3 w-2 mr-1"/>
                Free
            </div>
        </div>
    </div>
  )
}

export default Info