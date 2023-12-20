import db from "@/lib/db";


export const getUserAssistantsCount = async (userId: string) => {
  const assistantCount = await db.assistant.count({
    where: {
      userId,
    }
  });

  return assistantCount;
};