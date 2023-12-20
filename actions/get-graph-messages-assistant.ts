import db from "@/lib/db";

interface GraphData {
    name: string;
    messages: number;
  }
  
  export const getGraphMessagesAssistant = async (assistantId: string = ""): Promise<GraphData[]> => {
  
    const assistantMessages = await db.message.findMany({
      where: {
        assistantId: assistantId
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
      { name: "Jan", messages: 0 },
      { name: "Feb", messages: 0 },
      { name: "Mar", messages: 0 },
      { name: "Apr", messages: 0 },
      { name: "May", messages: 0 },
      { name: "Jun", messages: 0 },
      { name: "Jul", messages: 0 },
      { name: "Aug", messages: 0 },
      { name: "Sep", messages: 0 },
      { name: "Oct", messages: 0 },
      { name: "Nov", messages: 0 },
      { name: "Dec", messages: 0 },
    ];
  
    // Filling in the message count data
    for (const month in monthlyMessages) {
      graphData[parseInt(month)].messages = monthlyMessages[parseInt(month)];
    }
  
    return graphData;
  };
  
  
  