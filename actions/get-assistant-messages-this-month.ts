import db from "@/lib/db";

export const getMonthlyMessageCountForAssistant = async (assistantId: string): Promise<number> => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
  
    const monthlyMessageCount = await db.message.count({
      where: {
        assistantId,
        createdAt: {
          gte: new Date(currentDate.getFullYear(), currentMonth, 1), // First day of the current month
          lt: new Date(currentDate.getFullYear(), currentMonth + 1, 1), // First day of the next month
        },
      },
    });
  
    return monthlyMessageCount;
  };
  