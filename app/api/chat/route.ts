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
      const { userMessage } = await req.json() 

      if (!userMessage) {
        return new NextResponse("Messages are required", { status: 400 });
      }

     const chatHistory: any = []
  
      const messages = chatHistory.map(([role, content]: any) => ({ role, content }))
  
      messages.push({ role: "system", content: "You are an assitant of a company that sells toys for dogs" },{ role: "user", content: userMessage })
    
      const completion = await openai.chat.completions.create({
        messages: messages, 
        model: "gpt-3.5-turbo",
      });
  
      // Update history with user input and assistant response
      chatHistory.push("user", userMessage)
      chatHistory.push("assistant", completion.choices[0])

      return NextResponse.json(completion.choices[0].message, { headers: corsHeaders });
    } catch (error) {
        console.log('CHAT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}