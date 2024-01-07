import { getMonthlyMessageCountForUser } from "@/actions/get-user-messages-this-month";
import { MAX_FREE_MESSAGES, MAX_PRO_MESSAGES } from "@/constants/pricing";
import db from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

 const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  
  
  export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
  }

const DAY_IN_MS = 86_400_000;

export async function POST (req: Request) {
    try {
      const { userMessage, assistantId, sessionId } = await req.json() 

      if (!userMessage) {
        return new NextResponse("Messages are required", { status: 400 });
      }

      // const identifier = assistantId + "-" + sessionId
      // const { success } = await rateLimit(identifier)
  
      // if(!success) {
      //     return new NextResponse('Rate limit exceeded', { status: 429 })
      //    }
  

      const assistant = await db.assistant.findUnique({
        where: {
          id: assistantId
        },
        select: {
          name: true,
          instructions: true,
          isDeleted: true,
          user: {
            select: {
              id: true,
              userSubscription: true
            }
          }
        }
      })

      if (!assistant) {
        return new NextResponse('Assistant not found', { status: 401 })
      }

      const { user: { userSubscription } } = assistant;

      let monthlyMessageLimit = MAX_FREE_MESSAGES; 

    // Check if userSubscription exists and is valid
      if (userSubscription) {
        const isValid = 
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

         // If the subscription is not valid, handle it accordingly (e.g., return an error response)
         if (isValid) {
          monthlyMessageLimit = MAX_PRO_MESSAGES;
       }
     }

     const messagesThisMonth = await getMonthlyMessageCountForUser(assistant.user.id)

     if (messagesThisMonth >= monthlyMessageLimit) {
      return new NextResponse("Message limit exceeded for this month", { status: 403 });
     }  

      if (!assistant.instructions || assistant.isDeleted === true) {
        return new NextResponse('Assistant needs instructions before start using it', { status: 400 })
      }

    const history = await db.message.findMany({
      where: {
        assistantId,
        sessionToken: sessionId
      },
      select: {
        userMessage: true,
        assistantMessage: true
      },
      take: 3,
      orderBy: {
        createdAt: 'asc'
      }
    })

    const historyMap = history.map((message) => `USER: ${message.userMessage}\nASSISTANT: ${message.assistantMessage}`)

    console.log(historyMap)
  
     const messages: any = [{ role: "system", content: `Generate responses as ${assistant.instructions} without using any specific prefix. 
     Provide clear and concise answers based on your assigned role's instructions. 
     If your instructions are unclear, assume the role of a general assistant. 
     Utilize the following conversation history for context: 
     ${historyMap.join('\n')}
     If you don't know the answer, just say that you don't know, don't try to make up an answer.
     ` },
     { role: "user", content: userMessage }]
    
      const completion = await openai.chat.completions.create({
        messages: messages, 
        model: "gpt-3.5-turbo",
        temperature: 0
      });

      if (!completion.choices[0].message.content) {
        return new NextResponse('No response from Assistant', { status: 400 })
      }

      await db.message.create({
        data: {
          sessionToken: sessionId,
          assistantId: assistantId,
          userMessage,
          assistantMessage: completion.choices[0].message.content
        }
      })
     
      return NextResponse.json(completion.choices[0].message, { headers: corsHeaders });
    } catch (error) {
        console.log('CHAT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}