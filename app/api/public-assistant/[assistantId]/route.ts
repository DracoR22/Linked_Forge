import db from "@/lib/db";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  
  
export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET (req: Request, { params }: { params: { assistantId: string }}) {
    try {
        const assistant = await db.assistant.findUnique({
            where: {
                id: params.assistantId
            },
            select: {
                title: true,
                placeholder: true
            }
        })

        if (!assistant) {
            return new NextResponse('Assistant not found', { status: 400 })
        }

        return NextResponse.json(assistant, { headers: corsHeaders })
    } catch (error) {
        console.log('PUBLIC_ASSISTANT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}