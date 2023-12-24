import db from "@/lib/db"
import getSession from "./get-session"

const getCurrentUserDashboard = async () => {
    try {
        const session = await getSession()

        if(!session?.user?.email) {
            return null
        }

        const currentUserDashboard = await db.user.findUnique({
            where: {
            email: session.user.email as string
            },
            select: {
                id: true,
                image: true,
                email: true,
                name: true,
                assistants: {
                    where: {
                        isDeleted: false
                    },
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            },
        })

        if(!currentUserDashboard) {
            return null
        }

        return currentUserDashboard
    } catch (error: any) {
        return null
    }
}

export default getCurrentUserDashboard