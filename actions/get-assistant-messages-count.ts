import db from "@/lib/db";

export const getAssistantMessagesCount = async (assistantId: string) => {
  
    const messageCount = await db.message.count({
      where: {
        assistantId
      },
    });
  
    return messageCount;
  };
  