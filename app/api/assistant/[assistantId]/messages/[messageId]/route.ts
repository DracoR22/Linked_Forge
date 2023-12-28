import getCurrentUserServer from "@/actions/get-current-user-server";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE (req: Request, { params }: { params: { assistantId: string; messageId: string }}) {
    try {
        const currentUser = await getCurrentUserServer()

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        } 

        const assistant = await db.assistant.findUnique({
            where: {
                id: params.assistantId,
                userId: currentUser.id
            },
            select: {
                userId: true
            }
        })

        if (!assistant) {
            return new NextResponse('Assistant not found.', { status: 400 })
        }

        if (assistant.userId !== currentUser.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // const deletedMessage = await db.message.delete({
        //     where: {
        //         id: params.messageId,
        //         assistantId: params.assistantId
        //     }
        // })

        return NextResponse.json(assistant)
    } catch (error) {
        console.error('ASSISTANT_DELETE_MESSAGES', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}