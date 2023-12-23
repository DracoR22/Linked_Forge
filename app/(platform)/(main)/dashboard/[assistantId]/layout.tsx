import getUserAssistantHeader from "@/actions/get-user-assistant-header";
import Banner from "@/components/Banner";
import Info from "@/components/assistants/Info";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";

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