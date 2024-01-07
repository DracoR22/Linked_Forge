'use client'

import { MoreVertical, SendHorizonal } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ElementRef, useEffect, useRef, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { SyncLoader } from 'react-spinners'
import { Separator } from "../ui/separator"

interface Props {
    src: string | undefined
    text: string | null
    title: string | null
}

const ChatMessages = ({ src, text, title }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userMessage, setUserMessage] = useState<string>('')
    const [messages, setMessages] = useState<any>([]);

    const params = useParams()

    const session = useSession()

    const scrollRef = useRef<ElementRef<'div'>>(null)

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
       }, [messages.length])

    const handleSubmit = async (e: any) => {
         e.preventDefault()
         if (!userMessage || userMessage === '') {
            return
          }
          setMessages((current: any) => [...current, { content: userMessage, role: 'user' }]);
          setUserMessage('');
          try {
            setIsLoading(true)
            const response = await axios.post('/api/chat', { userMessage, assistantId: params.assistantId, sessionId: session.data?.user.id });
            setMessages((current: any) => [
                ...current, // Remove the user's message placeholder
                { content: response.data.content, role: 'assistant' } // Add the server's response with the appropriate role
              ]);
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }
    }

  return (
    <>
      {/* CHAT HEADER */}
      <div className="flex flex-row gap-x-3">
       <div className="flex-1 flex flex-row gap-x-3">
          <Image src={src || "/ultimate.svg"} alt="assistant image" width={500} height={500} className="object-cover rounded-full w-[50px] h-[50px]"/>
        <div>
        <p className="text-lg font-semibold">
          {title ? title : "Chat Support"}
        </p>
        <p className="text-neutral-600 font-medium text-xs mt-[3px]">
            {isLoading ? 'Typing..' : 'Online'}
        </p>
        </div>
       </div>

        <div className="flex items-center">
          {/* <Button variant='ghost'>
            <MoreVertical className="w-6 h-6 cursor-pointer"/>
          </Button> */}
        </div>
      </div>

      <Separator className="my-3" />

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto pr-4">
        <div className="group flex items-start gap-x-3 py-4 w-full">
         {<Image src={src || "/ultimate.svg"} alt="assistant image" width={500} height={500} className="object-cover rounded-full w-[35px] h-[35px]"/>}
          <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
            {text ? text : "Hi, I am your AI assistant, ask me anything!"}
           </div>
         </div>

            {messages.map((message: any, i: number) => (
              <div key={i} className={cn('group flex items-start gap-x-3 py-4 w-full',
              message.role === 'user' && 'justify-end')}>
                {message.role !== 'user' &&  <Image src={src || "/ultimate.svg"} alt="assistant image" width={500} height={500} className="object-cover rounded-full w-[35px] h-[35px]"/>}
                <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                  {message.content}
                </div>
             </div>
            ))}
        <div ref={scrollRef}/>
      </div>

      {/* CHAT INPUT */}
     <form onSubmit={handleSubmit} className="border-t border-neutral-200 py-4 flex items-center gap-x-2">
      <Input className="focus-visible:ring-indigo-500 focus-visible:ring-offset-0 rounded-lg border-neutral-300"
      placeholder="Type your message" id="userMessage" value={userMessage} onChange={(e) => setUserMessage(e.target.value) }/>
      <Button disabled={isLoading} variant='ghost'>
        <SendHorizonal className="h-6 w-6"/>
      </Button>
    </form>
    </>
  )
}

export default ChatMessages