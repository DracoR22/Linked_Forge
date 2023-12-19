'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const Settings = () => {
  return (
    <div>
        <div className="mb-4 flex items-center">
            <div className="flex-1">
            <h1 className="text-xl font-medium ">
                Link Assistant
            </h1>
            <p className="text-sm text-neutral-600">
              See the script to use your assistant in your website
            </p>
            </div>
            <Button variant='purple' className="mt-2 text-sm" size={'sm'}>
              See code
            </Button>
        </div>
         <Separator className="my-2"/>
        <div className="mt-4 flex items-center">
            <div className="flex-1">
             <h1 className="text-xl font-medium">
                Delete Assistant
             </h1>
             <p className="text-sm text-neutral-600">
                Delete your assistant forever
             </p>
            </div>
            <Button variant='destructive' className="mt-2 text-sm" size={'sm'}>
               Delete
            </Button>
        </div>
    </div>
  )
}

export default Settings