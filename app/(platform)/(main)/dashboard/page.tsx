import { getConversationsCountForUser } from "@/actions/get-conversations-count-user";
import getCurrentUserServer from "@/actions/get-current-user-server";
import { getGraphRevenueUser } from "@/actions/get-graph-revenue-user";
import getSession from "@/actions/get-session";
import { getUserAssistantsCount } from "@/actions/get-user-assistants-count";
import { getMonthlyMessageCountForUser } from "@/actions/get-user-messages-this-month";
import Banner from "@/components/Banner";
import Hint from "@/components/Hint";
import AssistantsCount from "@/components/dashboard/AssistantsCount";
import ConversationsCount from "@/components/dashboard/ConversationsCount";
import MessagesCount from "@/components/dashboard/MessagesCount";
import Overview from "@/components/dashboard/Overview";
import { Separator } from "@/components/ui/separator";
import { MAX_FREE_MESSAGES, MAX_PRO_MESSAGES } from "@/constants/pricing";
import { checkSubscription } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { CreditCard, Crown } from "lucide-react";

const DashboardPage = async () => {

  const session = await getSession()
  if (!session) return null

  const userMessageCountMonth = await getMonthlyMessageCountForUser(session.user.id);
  const userConversationCount = await getConversationsCountForUser(session.user.id)
  const userGraphRevenue = await getGraphRevenueUser(session.user.id)
  const userAssistants = await getUserAssistantsCount(session.user.id)

  const isPro = await checkSubscription()

  return (
    <section className="w-full mb-6">
      {!isPro && userMessageCountMonth >= MAX_FREE_MESSAGES && (
        <div className={cn(`mb-4 -mt-6`)}>
         <Banner description="You ran out of messages for this month, upgrade to Pro plan to have unlimited messages"/>
       </div>
      )}

      {isPro && userMessageCountMonth >= MAX_PRO_MESSAGES && (
        <div className={cn(`mb-4 -mt-6`)}>
         <Banner description="You ran out of messages for this month, you can contact us if you need a custom plan for more messages"/>
       </div>
      )}
      <div>
        <h1 className="font-semibold text-3xl">
           Dashboard
        </h1>
        <p className="text-sm mt-1 text-neutral-600">Overview of your account</p>

        {!isPro && (
        <Hint side="top" sideOffset={10} description="You are currently in a free plan">
        <div className="mt-2 flex items-center text-xs text-muted-foreground">             
                <CreditCard className="h-4 w-4 mr-1"/>
                  Free 
        </div>
        </Hint>
        )}

       {isPro && (
         <Hint side="top" sideOffset={10} description="You are a pro member">
         <div className="mt-2 flex items-center text-xs text-muted-foreground">             
                 <Crown className="h-4 w-4 mr-1 text-amber-500"/>
                   Pro
         </div>
         </Hint>
        )}
        
      </div>
      <Separator className="my-4"/>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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