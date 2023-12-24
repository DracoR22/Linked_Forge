import getUserAssistantIdMessages from "@/actions/get-user-assistant-id-messages"
import Info from "@/components/assistants/Info"
import Settings from "@/components/assistants/settings/Settings"
import { Separator } from "@/components/ui/separator"
import db from "@/lib/db"


const SettingsPage = async ({ params } : { params: { assistantId: string } }) => {

  const assistant = await db.assistant.findUnique({
    where: {
      id: params.assistantId
    },
    select: {
      instructions: true,
      name: true
    }
  })

  if (!assistant) {
    return null
  }

  return (
    <div className="w-full mb-4">

       <div className="flex items-center justify-between mt-6">
         <div className="flex flex-col gap-y-2">
           <h1 className="text-2xl font-medium">
             Settings
           </h1>
           <span className="text-sm text-slate-700">
              Assistant Settings
           </span>
         </div>
      </div>

      <div className="mt-6">
         <Settings instructions={assistant.instructions} name={assistant.name}/>
      </div>
    </div>
  )
}

export default SettingsPage