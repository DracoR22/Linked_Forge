import { getAssistantMessagesCount } from "@/actions/get-assistant-messages-count"
import { getMonthlyMessageCountForAssistant } from "@/actions/get-assistant-messages-this-month"
import { getConversationsCountForAssistant } from "@/actions/get-conversations-count-assistant"
import { getGraphMessagesAssistant } from "@/actions/get-graph-messages-assistant"
import LinkButton from "@/components/LinkButton"
import AssistantConversations from "@/components/assistants/overview/AssistantConversations"
import AssistantMessages from "@/components/assistants/overview/AssistantMessages"
import AssistantMessagesMonth from "@/components/assistants/overview/AssistantMessagesMonth"
import AssistantOverview from "@/components/assistants/overview/AssistantOverview"
import { Button } from "@/components/ui/button"
import db from "@/lib/db"
import Script from "next/script"


const AssistantIdPage = async ({ params } : { params: { assistantId: string } }) => {

  const assistant = await db.assistant.findUnique({
    where: {
      id: params.assistantId
    },
    select: {
      name: true,
      instructions: true
    }
  })

  if (!assistant) {
    return null
  }

  const messagesCount = await getAssistantMessagesCount(params.assistantId)
  const conversationsCount = await getConversationsCountForAssistant(params.assistantId)
  const assistantMessagesGraph = await getGraphMessagesAssistant(params.assistantId)
  const assistantMonthMessages = await getMonthlyMessageCountForAssistant(params.assistantId)
 
  return (
    <section className="mb-6">
        <div className="hidden md:flex justify-end">
           <LinkButton instructions={assistant.instructions}/>
         </div>
       <div className="-mt-[50px]">
         <h1 className="hidden sm:flex font-medium text-2xl mt-6">
            Assistant Overview
         </h1>
         <p className="hidden sm:flex text-sm mt-1 text-neutral-600">
            See how {assistant?.name} is doing
         </p>
       </div>
       <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-12 sm:mt-6">
          <AssistantMessagesMonth messages={assistantMonthMessages}/>
          <AssistantMessages messages={messagesCount}/>
          <AssistantConversations conversations={conversationsCount}/>
       </div>
       <div className="mt-4">
        <AssistantOverview data={assistantMessagesGraph}/>
       </div>
    </section>
  )
}

export default AssistantIdPage