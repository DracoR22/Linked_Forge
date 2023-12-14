import getCurrentUserDashboard from "@/actions/get-current-user-dashboard";
import getCurrentUserServer from "@/actions/get-current-user-server";
import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { name } = await req.json()

        if (!name) {
            return new NextResponse("An assistant name is required", { status: 400 });
        }

        const currentUser = await getCurrentUserServer()
        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const existingAssistant = await db.user.findFirst({
            where: {
                id: currentUser.id,
                assistants: {
                    some: {
                        name: name,
                    },
                },
            },
        });

        if (existingAssistant) {
            return new NextResponse("An assistant with the same name already exists", { status: 400 });
        }

        const newAssistant = await db.assistant.create({
            data: {
                userId: currentUser.id,
                name
            }
        })

        return NextResponse.json(newAssistant)
    } catch (error) {
        console.log('CREATE_ASSISTANT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}