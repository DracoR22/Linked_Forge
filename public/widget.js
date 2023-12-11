const sendMessageToChat = async (messages) => {
    try {
        // Assuming your API endpoint for chat is "/api/chat"
        const apiUrl = 'http://localhost:3000/api/chat';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            // Handle non-successful response
            console.error('Error:', response.statusText);
            return null; // Or throw an error if you prefer
        }

        const result = await response.json();
        console.log('Response from chat API:', result);
        return result;
    } catch (error) {
        console.error('Error sending message to chat:', error);
        return null; // Or throw an error if you prefer
    }
};

const createWidget = async () => {
    
    // Call the function to send messages to the chat API
    // const chatResponse = await sendMessageToChat(messages);

    // Get the script tag
    const scriptTag = document.querySelector('script[data-ai-id]');
  
    // Get the value of the data-ai-id attribute
    const aiId = scriptTag.getAttribute('data-ai-id');
  
    // Create a new container element
    const widgetContainer = document.createElement('div');
    widgetContainer.id = `widget-container-${aiId}`; // Use the AI ID for uniqueness
  
    // STYLES
    Object.assign(widgetContainer.style, {
      position: 'fixed',
      bottom: '0',
      left: '0',
      margin: '10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  });
    
    // STYLES
    const buttonStyles = {
      color: '#6574cd',
      fontSize: '1.5rem',
      backgroundColor: '#ff0000',
      borderRadius: '9999px',
      padding: '1.5rem 1.5rem',
      border: 'none',
      cursor: 'pointer'
    };

    const bodyStyles = {
        backgroundColor: '#ff0000',
        width: '350px',
        height: '400px',
        display: "none",
        flexDirection: 'column',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
    }

    const body = document.createElement('div');
    Object.assign(body.style, bodyStyles)
  
    const button = document.createElement('button');
    Object.assign(button.style, buttonStyles);

    const title = document.createElement('h3');
    title.textContent = 'Widget Title';
    title.style.color = '#fff';

    const scrollableContent = document.createElement('div');
    scrollableContent.style.overflowY = 'scroll';
    scrollableContent.style.overflowX = 'hidden';
    scrollableContent.style.flexGrow = 1;
    scrollableContent.style.backgroundColor = '#FFFFFF'

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.id = 'userResponse';
    input.name = 'userResponse';

    // let userResponse = '';
    let conversationHistory = [];


    // Event listeners
    button.addEventListener('click', () => {
        body.style.display = body.style.display === 'none' ? 'flex' : 'none';
      });

    // input.addEventListener('input', (e) => {
    //     userResponse = e.target.value;
    //   });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
      
        const userMessage = [{role: 'system', content: "You are a helpful assistant."}, {role: 'user', content: input.value} ];
      
        try {
            // Make the request and get the response
            const chatResponse = await sendMessageToChat(userMessage);
        
            input.value = '';
    
            // Add the user's message and the assistant's response to the conversation history
            conversationHistory.push(userMessage, chatResponse);
    
            // Display the entire conversation history
            displayConversation();
        } catch (error) {
            // Handle any errors that might occur during the request
            console.error('Error sending message:', error);
        }
    });
    
    const messageElement = document.createElement('div');
    messageElement.textContent = 'hola';
    messageElement.style.position = 'absolute';
    messageElement.style.top = '80px';
    messageElement.style.left = '10px';
    messageElement.style.padding = '8px';
    messageElement.style.borderRadius = '8px';
   
    
    scrollableContent.appendChild(messageElement);
        
    // Append inside of the body
    body.appendChild(title);
    body.appendChild(scrollableContent);
    body.appendChild(form)

    form.appendChild(input)
  
    // Append all of our elements
    widgetContainer.appendChild(body)
    widgetContainer.appendChild(button);
  
    // Append the new container to the body of the document
    document.body.appendChild(widgetContainer);
  
    return widgetContainer;
  };
  
  // Call createWidget to dynamically create and append the widget container
  createWidget();
  