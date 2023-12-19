import { getConversationsCountForUser } from "@/actions/get-conversations-count-user";
import getCurrentUserServer from "@/actions/get-current-user-server";
import { getGraphRevenueUser } from "@/actions/get-graph-revenue-user";
import { getMessageCountForUser } from "@/actions/get-messages-count-user";
import ConversationsCount from "@/components/dashboard/ConversationsCount";
import MessagesCount from "@/components/dashboard/MessagesCount";
import Overview from "@/components/dashboard/Overview";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

const DashboardPage = async () => {

  const currentUser = await getCurrentUserServer()

  if (!currentUser) {
    return null
  }

  const userMessageCount = await getMessageCountForUser(currentUser.id);
  const userConversationCount = await getConversationsCountForUser(currentUser.id)
  const userGraphRevenue = await getGraphRevenueUser(currentUser.id)

  return (
    <div className="w-full">
      <div>
        <h1 className="font-medium text-2xl">
           Dashboard
        </h1>
        <p className="text-sm text-neutral-600">Overview of your account</p>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <CreditCard className="h-3 w-2 mr-1"/>
                Free
        </div>
      </div>
      <Separator className="my-4"/>
      <div className="grid gap-4 grid-cols-3">
         <MessagesCount messages={userMessageCount}/>
         <ConversationsCount conversations={userConversationCount}/>
         {/* <AssistantsCount/> */}
      </div>
      <div className="mt-4">
        <Overview data={userGraphRevenue}/>
      </div>
    </div>
  )
}

export default DashboardPage