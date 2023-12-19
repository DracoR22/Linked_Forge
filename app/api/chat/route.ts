import db from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  
  
  export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
  }

export async function POST (req: Request) {
    try {
      const { userMessage, assistantId, sessionId } = await req.json() 

      if (!userMessage) {
        return new NextResponse("Messages are required", { status: 400 });
      }

      const assistant = await db.assistant.findUnique({
        where: {
          id: assistantId
        },
        select: {
          name: true,
          instructions: true
        }
      })

      if (!assistant) {
        return new NextResponse('Assistant not found', { status: 401 })
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
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const historyMap = history.map((message) => `USER: ${message.userMessage} ${assistant.name.toUpperCase()}: ${message.assistantMessage}`)

    console.log(historyMap)
  
     const messages: any = [{ role: "system", content: `ONLY generate plain sentences without prefix of ${assistant.name}. DO NOT use any prefix. 
     Below are relevant details about your role. Only give consice answers, that means never give questions as answers.
     ${assistant.instructions}
     Below is the history of the messages of the conversation, use this to have context of the conversation you are in. If its empty that means there is not previous messages in this conversation
     user:${historyMap}
     Also you can only answer questions based on your role details.
     Everytime that you dont know an answer respond the following: 'Im sorry i cant answer that question'
     ` },
     { role: "user", content: userMessage }]
    
      const completion = await openai.chat.completions.create({
        messages: messages, 
        model: "gpt-3.5-turbo",
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