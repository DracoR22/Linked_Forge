'use client'

import Image from "next/image"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
  })

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
     <div className="hidden md:flex items-center gap-x-4 cursor-pointer">
         <Image src="/ultimate.svg" height={50} width={50} alt="Logo" className="rounded-full"/>
         {/* <p className={cn("font-semibold text-xl", font.className)}>
           Linked <span className="text-indigo-500">Forge</span>
         </p> */}
       </div>
    <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
      <Button variant="ghost" size="sm">
          Privacy Policy
      </Button>
      <Button variant="ghost" size="sm">
          Terms & Conditions
      </Button>
    </div>
  </div>
  )
}

export default Footer