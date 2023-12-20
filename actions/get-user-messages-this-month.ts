import db from "@/lib/db";

export const getMonthlyMessageCountForUser = async (userId: string): Promise<number> => {

    const assistants = await db.assistant.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const assistantIds = assistants.map((assistant) => assistant.id);
  
    const monthlyMessageCount = await db.message.count({
      where: {
        assistantId: {
            in: assistantIds,
          },
        createdAt: {
          gte: new Date(currentDate.getFullYear(), currentMonth, 1), // First day of the current month
          lt: new Date(currentDate.getFullYear(), currentMonth + 1, 1), // First day of the next month
        },
      },
    });
  
    return monthlyMessageCount;
  };
  