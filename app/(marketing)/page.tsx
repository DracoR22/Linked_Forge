'use client'

import axios from "axios"
import { useState } from "react"

const MarketingPage = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/chat', { userMessage });
      const assistantResponse = response.data.content;

      // Update chat history with user input and assistant response
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: assistantResponse }]);
      console.log(chatHistory)
      // Clear user message input
      setUserMessage('');
    } catch (error) {
      console.error('API request failed', error);
      // Handle error as needed
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="userMessage"
        id="userMessage"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button type="submit">Send</button>

      {chatHistory.map((message: any, index: number) => (
  <div key={index}>
    {message.role === 'user' ? 'User: ' : 'Assistant: '}
    {message.content}
  </div>
))}
    </form>
  );
};

export default MarketingPage