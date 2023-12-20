import db from "@/lib/db";

export const getConversationsCountForAssistant = async (assistantId: string) => {
  
    const distinctSessionTokens = await db.message.findMany({
      where: {
        assistantId
      },
      distinct: ['sessionToken'],
      select: {
        sessionToken: true,
      },
    });
  
    const sessionCount = distinctSessionTokens.length;
  
    return sessionCount;
  };
  