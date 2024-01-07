import getUserAssistantHeader from "@/actions/get-user-assistant-header";
import Banner from "@/components/Banner";
import Info from "@/components/assistants/Info";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import db from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";

export async function generateMetadata({ children, params }: { children: React.ReactNode; params: {assistantId: string} }) {
  const assistant = await db.assistant.findUnique({
    where: {
      id: params.assistantId
    },
    select: {
      name: true
    }
  })
  return  {
      title: `${assistant?.name} - ${siteConfig.name}` || 'Dashboard'
  }
}

const PlatformLayout = async ({ children, params }: { children: React.ReactNode; params: {assistantId: string} }) => {

    const assistant = await getUserAssistantHeader(params)
    // const isPro = await checkSubscription()
  
      return (
        <main className="w-full">
          <div className="mb-4 md:-mt-6">
            {!assistant?.instructions && (
              <Banner description="Your assistant need instructions before you can start using it. Go to the 'Custom' page to add new instructions"/>
            )}
          </div>
             <Info assistant={assistant}/>
             <Separator className="my-2"/>
           {children}
        </main>
      )
    }
    
    export default PlatformLayout