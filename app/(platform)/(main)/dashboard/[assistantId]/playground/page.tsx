import ChatMessages from "@/components/playground/ChatMessages"
import { Button } from "@/components/ui/button"
import db from "@/lib/db"
import Link from "next/link"

const PlaygroundPage = async ({ params } : { params: { assistantId: string } }) => {

  const assistant = await db.assistant.findUnique({
     where: {
        id: params.assistantId
     },
     select: {
        name: true,
        title: true,
        placeholder: true,
        instructions: true,
        image: {
            select: {
                url: true
            }
        }
     }
  })

  if (!assistant) {
    return
  }

  return (
   <>
   {assistant.instructions ? (
     <div className="flex mx-auto h-[500px] sm:w-[500px] flex-col p-4 space-y-2 border border-neutral-200 rounded-md">
       <ChatMessages src={assistant.image?.url} text={assistant.placeholder} title={assistant.title}/>
     </div>
   ) : (
      <div className="flex items-center justify-center text-center my-6">
         <div className="flex flex-col gap-y-2">
           <h1 className="text-2xl font-medium">
             Chat Playground
           </h1>
           <span className="text-sm text-slate-700">
               Give instructions to your assistant to unlock the playground
           </span>

           <Button variant='purple' className="mt-3" asChild>
             <Link href={`/dashboard/${params.assistantId}/custom`}>
               Give instructions
             </Link>
           </Button>
         </div>
      </div> 
   )}
   </>
  )
}

export default PlaygroundPage