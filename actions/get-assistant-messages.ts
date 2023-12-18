import db from "@/lib/db"

interface IParams {
    assistantId?: string
}

const getAssistantMessages = async (params: IParams) => {
  const { assistantId } = params
  
  const messages = await db.message.findMany({
    where: {
        assistantId
    },
    select: {
        id: true,
        userMessage: true,
        assistantMessage: true,
        createdAt: true
    },
    orderBy: {
        createdAt: 'desc'
    },
    take: 15
   })

  return messages
}

export default getAssistantMessages