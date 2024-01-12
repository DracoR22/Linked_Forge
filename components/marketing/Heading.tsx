'use client'

import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-6">
         
     <h1 className="text-3xl sm:text-5xl font-bold">
        Your own AI chatbot for your website:
        <span className="text-indigo-500"> Imagine having your own ChatGPT!</span>
     </h1>

      <h3 className="text-base sm:text-xl font-medium text-black">
      No coding skills required, no APIs and a fast setup, get your own AI assistant that
      engage, and grow with your audience.
      </h3>

      <div className="space-y-2 space-x-2">
        <Button asChild variant='purple'>
            <Link href={'/sign-up'}>
              Start for free
            </Link>
        </Button>

        <Button asChild variant='ghost'>
            <Link href={"#get-started"}>
              Learn more
              <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
        </Button>
      </div>
    
    </div>
  )
}

export default Heading