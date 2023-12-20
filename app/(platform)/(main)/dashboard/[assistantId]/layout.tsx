import getUserAssistantHeader from "@/actions/get-user-assistant-header";
import Banner from "@/components/Banner";
import Info from "@/components/assistants/Info";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const PlatformLayout = async ({ children, params }: { children: React.ReactNode; params: {assistantId: string} }) => {

    const assistant = await getUserAssistantHeader(params)
  
      return (
        <main className="w-full">
          <div className="mb-4 -mt-6">
            {!assistant?.instructions && (
              <Banner>
              <p>
                 Your assistant need instructions before start using it
              </p>
              <div className="flex-1"/>
              <button className="flex justify-end ml-2 rounded-lg hover:bg-indigo-500/10 border border-black transition p-2">
                <Link href={`/dashboard/${params.assistantId}/custom`}>
                  Give instructions
                </Link>
              </button>
           </Banner>
            )}
          </div>
             <Info assistant={assistant}/>
             <Separator className="my-2"/>
           {children}
        </main>
      )
    }
    
    export default PlatformLayout