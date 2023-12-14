import db from "@/lib/db"
import getSession from "./get-session"


const getCurrentUserServer = async () => {
    try {
        const session = await getSession()

        if(!session?.user?.email) {
            return null
        }

        const currentUserServer = await db.user.findUnique({
            where: {
            email: session.user.email as string
            },
            select: {
                id: true,
                assistants: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
        })

        if(!currentUserServer) {
            return null
        }

        return currentUserServer
    } catch (error: any) {
        return null
    }
}

export default getCurrentUserServer