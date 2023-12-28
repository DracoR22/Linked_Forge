import getSession from "@/actions/get-session";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (req: Request, { params }: { params: { assistantId: string }}) {
    try {
        const values = await req.json()

        if (!values) {
            return new NextResponse('Fields required', { status: 400 })
        }

        const session = await getSession()

        if (!session || !session.user.id) {
            return new NextResponse('Unauthorized', { status: 400 })
        }

        const assistant = await db.assistant.update({
            where: {
                id: params.assistantId,
                userId: session.user.id
            },
            data: {
              ...values
            }
        })

        return NextResponse.json(assistant)
    } catch (error) {
        console.log('ASSISTANT_UPDATE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}