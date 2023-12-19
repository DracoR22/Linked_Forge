import db from "@/lib/db";

export const getConversationsCountForUser = async (userId: string) => {
    const assistants = await db.assistant.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
  
    const assistantIds = assistants.map((assistant) => assistant.id);
  
    const distinctSessionTokens = await db.message.findMany({
      where: {
        assistantId: {
          in: assistantIds,
        },
      },
      distinct: ['sessionToken'],
      select: {
        sessionToken: true,
      },
    });
  
    const sessionCount = distinctSessionTokens.length;
  
    return sessionCount;
  };
  