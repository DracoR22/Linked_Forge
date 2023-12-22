import { getConversationsCountForUser } from "@/actions/get-conversations-count-user";
import getCurrentUserServer from "@/actions/get-current-user-server";
import { getGraphRevenueUser } from "@/actions/get-graph-revenue-user";
import { getUserAssistantsCount } from "@/actions/get-user-assistants-count";
import { getMonthlyMessageCountForUser } from "@/actions/get-user-messages-this-month";
import Banner from "@/components/Banner";
import Hint from "@/components/Hint";
import AssistantsCount from "@/components/dashboard/AssistantsCount";
import ConversationsCount from "@/components/dashboard/ConversationsCount";
import MessagesCount from "@/components/dashboard/MessagesCount";
import Overview from "@/components/dashboard/Overview";
import { Separator } from "@/components/ui/separator";
import { MAX_FREE_MESSAGES } from "@/constants/pricing";
import { checkSubscription } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";

const DashboardPage = async () => {

  const currentUser = await getCurrentUserServer()

  if (!currentUser) {
    return null
  }

  const userMessageCountMonth = await getMonthlyMessageCountForUser(currentUser.id);
  const userConversationCount = await getConversationsCountForUser(currentUser.id)
  const userGraphRevenue = await getGraphRevenueUser(currentUser.id)
  const userAssistants = await getUserAssistantsCount(currentUser.id)

  const isPro = await checkSubscription()

  return (
    <section className="w-full mb-6">
      {userMessageCountMonth >= MAX_FREE_MESSAGES && (
        <div className={cn(`mb-4 -mt-6`)}>
         <Banner description="You ran out of messages for this month, upgrade to Pro plan to have unlimited messages"/>
       </div>
      )}
      <div>
        <h1 className="font-semibold text-3xl">
           Dashboard
        </h1>
        <p className="text-sm mt-1 text-neutral-600">Overview of your account</p>
        <Hint side="top" sideOffset={10} description="You are currently in a free plan">
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4 mr-1"/>
                Free
        </div>
        </Hint>
      </div>
      <Separator className="my-4"/>
      <div className="grid gap-4 grid-cols-3">
         <MessagesCount messages={userMessageCountMonth} isPro={isPro}/>
         <ConversationsCount conversations={userConversationCount}/>
         <AssistantsCount assistants={userAssistants}/>
      </div>
      <div className="mt-4">
        <Overview data={userGraphRevenue}/>
      </div>
    </section>
  )
}

export default DashboardPage