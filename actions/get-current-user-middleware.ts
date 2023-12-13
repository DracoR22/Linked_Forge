import db from "@/lib/db"
import getSession from "./get-session"


const getCurrentUserMiddleware = async () => {
    try {
        const session = await getSession()

        if(!session?.user?.email) {
            return null
        }

        const currentUserMiddleware = await db.user.findUnique({
            where: {
            email: session.user.email as string
            },
            select: {
                id: true,
                assistants: {
                    select: {
                        id: true,
                    }
                }
            },
        })

        if(!currentUserMiddleware) {
            return null
        }

        return currentUserMiddleware
    } catch (error: any) {
        return null
    }
}

export default getCurrentUserMiddleware