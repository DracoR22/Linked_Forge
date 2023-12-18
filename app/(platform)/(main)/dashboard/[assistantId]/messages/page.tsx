import getUserAssistantIdMessages from "@/actions/get-user-assistant-id-messages"
import Info from "@/components/assistants/Info"
import { Separator } from "@/components/ui/separator"
import { columns } from "@/components/messages/Columns"
import { DataTable } from "@/components/messages/DataTable"
import db from "@/lib/db"
import getAssistantMessages from "@/actions/get-assistant-messages"


const MessagesPage = async ({ params } : { params: { assistantId: string } }) => {

   const assistant = await getUserAssistantIdMessages(params)

   const messages = await getAssistantMessages(params)

  return (
    <div className="w-full mb-4">
      <Info assistant={assistant}/>
      <Separator className="my-2"/>

      <div className="-mt-4 p-6">
        <DataTable columns={columns} data={messages} />
      </div>
    </div>
  )
}

export default MessagesPage