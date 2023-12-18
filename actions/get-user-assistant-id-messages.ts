import db from "@/lib/db"
import getCurrentUserServer from "./get-current-user-server"

interface IParams {
    assistantId?: string
}

const getUserAssistantIdMessages = async (params: IParams) => {
  const { assistantId } = params
  const currentUser = await getCurrentUserServer()

  if (!currentUser) {
    return null
  }

  const assistant = await db.assistant.findUnique({
    where: {
        id: assistantId,
        userId: currentUser.id
    },
    select: {
        name: true,
        image: true,
    }
  })

  if (!assistant) {
    return null
  }

  return assistant
}

export default getUserAssistantIdMessages