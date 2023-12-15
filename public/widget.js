const createWidget = async () => {

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
      bottom: '75px',
      right: '30px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  });
    
    // STYLES
    const buttonStyles = {
      color: '#00000',
      fontSize: '1.5rem',
      backgroundColor: '#000000',
      position: 'absolute',
      right: '0',
      borderRadius: '9999px',
      padding: '1.7rem 1.7rem',
      border: 'none',
      cursor: 'pointer',
      transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '500ms',
    };

    const bodyStyles = {
        backgroundColor: '#FFFFFF',
        width: '350px',
        height: '400px',
        display: "none",
        flexDirection: 'column',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
        borderRadius: '10px'
    }

    const inputStyles = {
        width: '320px',
        height: '40px',
        display: 'flex',
        marginLeft: '5px',
        marginRight: '5px',
        border: 'none',
        outline: 'none',
        paddingLeft: '6px'
    }

    let statusText = 'Online'

    const body = document.createElement('div');
    Object.assign(body.style, bodyStyles)
  
    const button = document.createElement('button');
    Object.assign(button.style, buttonStyles);

    const title = document.createElement('h3');
    title.textContent = 'Chat Support';
    title.style.marginLeft = '20px'
    title.style.fontSize = '20px'
    title.style.width = '100%'
    title.style.fontWeight = '500'
    title.style.paddingTop = '10px'
 

    const status = document.createElement('p');
    status.textContent = statusText
    status.style.fontSize = '10px'
    status.style.marginLeft = '20px'
    status.style.marginTop = '-10px'
    status.style.paddingBottom = '5px'
    status.style.color = '#666666'
    status.style.fontWeight = '700'

    const scrollableContent = document.createElement('div');
    scrollableContent.style.overflowY = 'scroll';
    scrollableContent.style.overflowX = 'hidden';
    scrollableContent.style.flexGrow = 1;
    scrollableContent.style.display = 'block';
    scrollableContent.style.backgroundColor = '#d9d9d9'

    const form = document.createElement('form');
    form.style.backgroundColor = '#FFFFFF'
    // form.style.height = '60px'
    form.style.marginTop = '7px'
    form.style.marginBottom = '7px'
    

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your question here...';
    input.id = 'userMessage';
    input.name = 'userMessage';
    Object.assign(input.style, inputStyles)

    const brand = document.createElement('p');
    brand.textContent = 'Powered by Linked Forge'
    brand.style.display = 'flex'
    brand.style.alignItems = 'flex-center'
    brand.style.justifyContent = 'center'
    brand.style.fontSize = '10px'
    brand.style.color = '#666666'
    brand.style.fontWeight = '600'

    const oppeningText = document.createElement('div')
    oppeningText.textContent = 'Hi, I am your AI assistant, ask me anything!'
    oppeningText.style.backgroundColor = '#ffffff';
    oppeningText.style.marginTop = '12px'
    oppeningText.style.width = 'fit-content'

    oppeningText.style.marginLeft = '10px'
    oppeningText.style.marginBottom = '10px';
    oppeningText.style.borderRadius = '8px';
    oppeningText.style.padding = '8px';
    oppeningText.style.fontSize = '14px'

    let userMessage = '';
    let chatHistory = [];


    // Event listeners
    button.addEventListener('click', () => {
        body.style.display = body.style.display === 'none' ? 'flex' : 'none';
        button.style.borderRadius = '20px';
      });

      button.addEventListener('mouseenter', function () {
        if (body.style.display !== 'flex') {
          button.style.borderRadius = '20px';
        }
      });

      button.addEventListener('mouseleave', function () {
        if (body.style.display !== 'flex') {
          button.style.borderRadius = '9999px';
        }
      });


    form.addEventListener('submit', async (event) => {
        event.preventDefault();
      
       // Get user input
      userMessage = input.value;

      chatHistory.push({ role: 'user', content: userMessage });

      input.value = ''

      // Update the UI immediately
      updateChatHistory();

      try {
        // API call
        statusText = 'Typing...'
        status.textContent = statusText
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage, assistantId: aiId }),
          });
  
          const responseData = await response.json();

        // Get assistant response
        const assistantResponse = responseData.content;

        // Update chat history
        chatHistory.push({ role: 'assistant', content: assistantResponse });

        // Clear user message input
        userMessage = '';

        // Update the UI
        updateChatHistory();

        document.getElementById('userMessage').value = '';
      } catch (error) {
        console.error('API request failed', error);
      } finally {
        statusText = 'Online';
        status.textContent = statusText;
      }
    });

    function updateChatHistory() {
      
        scrollableContent.innerHTML = '';
  
        chatHistory.forEach((message, index) => {
          const messageContainer = document.createElement('div')
          const messageElement = document.createElement('div')
          messageContainer.style.width = "100%"
          messageContainer.style.display = "flex"
          messageContainer.style.paddingTop = '12px'

          messageElement.style.alignItems = 'start';
          messageElement.style.marginLeft = '10px'
          messageElement.style.marginRight = '10px'
          messageElement.style.marginBottom = '4px';
          messageElement.style.borderRadius = '8px';
          messageElement.style.padding = '8px';
          messageElement.style.fontSize = '14px'
          messageElement.style.maxWidth = '300px'

          if (message.role === 'user') {
            messageContainer.style.justifyContent = 'flex-end'; 
            messageElement.style.backgroundColor = '#1e90ff';
            messageElement.style.color = '#ffffff'

          } else {
            messageElement.style.backgroundColor = '#ffffff';
          }

          messageElement.innerHTML = `${message.content}`;
          messageContainer.appendChild(messageElement)
          scrollableContent.appendChild(messageContainer);

        });
      }
    
    scrollableContent.appendChild(oppeningText)

    // Append inside of the body
    body.appendChild(title);
    body.appendChild(status)
    body.appendChild(scrollableContent);
    body.appendChild(form)
    body.appendChild(brand)

    form.appendChild(input)
  
    // Append all of our elements
    widgetContainer.appendChild(body)
    widgetContainer.appendChild(button);
  
    // Append the new container to the body of the document
    document.body.appendChild(widgetContainer);
  
    return widgetContainer;
  };
  
  // Call createWidget to dynamically create and append the widget container
  document.addEventListener('DOMContentLoaded', function() {
    createWidget();
  });
  
  