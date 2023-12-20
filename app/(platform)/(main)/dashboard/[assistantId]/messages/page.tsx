import getUserAssistantIdMessages from "@/actions/get-user-assistant-id-messages"
import Info from "@/components/assistants/Info"
import { Separator } from "@/components/ui/separator"
import { columns } from "@/components/messages/Columns"
import { DataTable } from "@/components/messages/DataTable"
import getAssistantMessages from "@/actions/get-assistant-messages"


const MessagesPage = async ({ params } : { params: { assistantId: string } }) => {

   const messages = await getAssistantMessages(params)

  return (
    <div className=" mb-4">
      <div className="flex items-center justify-between mt-6">
         <div className="flex flex-col gap-y-2">
           <h1 className="text-2xl font-medium">
             See what your customers ask
           </h1>
           <span className="text-sm text-slate-700">
              Check if your assistant is replying the way you want
           </span>
         </div>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={messages} />
      </div>
    </div>
  )
}

export default MessagesPage