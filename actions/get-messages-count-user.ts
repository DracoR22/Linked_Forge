import db from "@/lib/db";

export const getMessageCountForUser = async (userId: string) => {
  
    const assistants = await db.assistant.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
  
    const assistantIds = assistants.map((assistant) => assistant.id);
  
    const messageCount = await db.message.count({
      where: {
        assistantId: {
          in: assistantIds,
        },
      },
    });
  
    return messageCount;
  };
  