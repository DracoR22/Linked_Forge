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
      const { userMessage, assistantId } = await req.json() 

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

    //  const chatHistory: any = []
  
    //   const messages = chatHistory.map(([role, content]: any) => ({ role, content }))
  
     const messages: any = [{ role: "system", content: `ONLY generate plain sentences without prefix of ${assistant.name}. DO NOT use any prefix. 
     ${assistant.instructions}
     Below are relevant details about your role. Only give consice answers, that means never give questions as answers.
     Also you can only answer questions based on your role details.
     Everytime that you dont know an answer respond the following: 'Im sorry i cant answer that question'` },
     { role: "user", content: userMessage }]
    
      const completion = await openai.chat.completions.create({
        messages: messages, 
        model: "gpt-3.5-turbo",
      });
  
      // Update history with user input and assistant response
     

      return NextResponse.json(completion.choices[0].message, { headers: corsHeaders });
    } catch (error) {
        console.log('CHAT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}