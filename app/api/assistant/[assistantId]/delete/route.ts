import getCurrentUserServer from "@/actions/get-current-user-server";
import getSession from "@/actions/get-session";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (req: Request, { params }: { params: { assistantId: string }}) {
    try {
        const session = await getSession()

        if (!session || !session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const assistant = await db.assistant.update({
            where: {
                id: params.assistantId,
                userId: session.user.id
            },
            data: {
                isDeleted: true
            }
        })

        return NextResponse.json(assistant)
    } catch (error) {
        console.log('ASSISTANT_DELETE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}