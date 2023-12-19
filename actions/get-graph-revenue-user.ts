import db from "@/lib/db";

interface GraphData {
    name: string;
    total: number;
  }
  
  export const getGraphRevenueUser = async (userId: string = ""): Promise<GraphData[]> => {
    const assistants = await db.assistant.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
  
    const assistantIds = assistants.map((assistant) => assistant.id);
  
    const assistantMessages = await db.message.findMany({
      where: {
        assistantId: {
          in: assistantIds,
        },
      },
      select: {
        createdAt: true,
      },
    });
  
    const monthlyMessages: { [key: number]: number } = {};
  
    // Counting the number of messages in each month
    for (const message of assistantMessages) {
      const month = message.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
      monthlyMessages[month] = (monthlyMessages[month] || 0) + 1;
    }
  
    // Converting the grouped data into the format expected by the graph
    const graphData: GraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];
  
    // Filling in the message count data
    for (const month in monthlyMessages) {
      graphData[parseInt(month)].total = monthlyMessages[parseInt(month)];
    }
  
    return graphData;
  };
  
  
  