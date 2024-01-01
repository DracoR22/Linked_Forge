import getCurrentUserDashboard from "@/actions/get-current-user-dashboard";
import getCurrentUserServer from "@/actions/get-current-user-server";
import getSession from "@/actions/get-session";
import db from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { name } = await req.json()

        if (!name) {
            return new NextResponse("An assistant name is required", { status: 400 });
        }

        const session = await getSession()

        if (!session || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const currentUser = await db.user.findUnique({
            where: {
              id: session.user.id
            },
            select: {
                id: true,
                assistants: {
                    where: {
                        isDeleted: false
                    },
                    select: { id: true }
                }
            }
        })

        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const isPro = await checkSubscription()

        if (!isPro && currentUser.assistants.length >= 1) {
            return new NextResponse('Assistant limit reached. Upgrade to Pro account for more assistants', { status: 403 })
        }

        if (isPro && currentUser.assistants.length >= 7) {
            return new NextResponse('You have reached the maximum number of assistants', { status: 403 })
        }

        const existingAssistant = await db.user.findFirst({
            where: {
                id: session.user.id,
                assistants: {
                    some: {
                        name: name,
                        isDeleted: false
                    },
                },
            },
        });

        if (existingAssistant) {
            return new NextResponse("An assistant with the same name already exists", { status: 400 });
        }

        const newAssistant = await db.assistant.create({
            data: {
                userId: session.user.id,
                name
            }
        })

        return NextResponse.json(newAssistant)
    } catch (error) {
        console.log('CREATE_ASSISTANT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}