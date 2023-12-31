let sessionId = sessionStorage.getItem('sessionId');

const generateSessionId = () =>  {

  return Math.random().toString(36).substring(2, 19);
}

if (!sessionId) {
  sessionId = generateSessionId();

  sessionStorage.setItem('sessionId', sessionId);
}

const createWidget = async () => {
// console.log(sessionId)
    // Get the script tag
    const scriptTag = document.querySelector('script[data-ai-id]');
  
    // Get the value of the data-ai-id attribute
    const aiId = scriptTag.getAttribute('data-ai-id');
  
    // Create a new container element
    const widgetContainer = document.createElement('div');
    widgetContainer.id = `widget-container-${aiId}`; // Use the AI ID for uniqueness

    // FETCH ASSISTANT DATA
    const assistantResponse = await fetch(`https://linkedforgeai.com/api/public-assistant/${aiId}`, {
      method: 'GET'
    });

    const assistant = await assistantResponse.json();

    if (assistant.isDeleted === true) {
      return
    }
  
    // STYLES
    Object.assign(widgetContainer.style, {
      position: 'fixed',
      bottom: '90px',
      right: '30px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  });
    
    // STYLES
    const buttonStyles = {
      color: '#00000',
      backgroundColor: '#667eea',
      position: 'fixed',
      right: '30px',
      border: 'none',
      cursor: 'pointer',
      transitionDuration: '300ms',
      width: '72px',        // Set a width for the button
      height: '69px',
      display: 'flex',                  // Add flex display
      justifyContent: 'center',         // Center content horizontally
      alignItems: 'center',
      zIndex: '9999'
    };

    const bodyStyles = {
        backgroundColor: '#FFFFFF',
        width: '350px',
        height: '400px',
        display: "none",
        flexDirection: 'column',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
        borderRadius: '10px',
        zIndex: '9999'
    }

    const inputStyles = {
        width: '320px',
        height: '40px',
        display: 'flex',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '0',
        fontWeight: '300',
        border: 'none',
        outline: 'none',
        paddingLeft: '6px',
        fontSize: '13px',
        color: '#00000'
    }

    let imageUrl = '';
    if (assistant && assistant.image && assistant.image.url) {
      imageUrl = assistant.image.url;
    }

    let statusText = 'Online'

    const body = document.createElement('div');
    Object.assign(body.style, bodyStyles)
  
    const button = document.createElement('button');
    Object.assign(button.style, buttonStyles);
    button.style.setProperty('border-radius', '9999px', 'important');
    button.style.setProperty('padding', '5px 12px', 'important');

    const header = document.createElement('div')
    header.style.display = 'flex'
    header.style.alignItems = 'center'
    header.style.marginTop = '10px'
    header.style.marginBottom = '5px'
    header.style.height = '60px'

    const titleStatusContainer = document.createElement('div');
     titleStatusContainer.style.display = 'flex';
     titleStatusContainer.style.flexDirection = 'column';  // Stack items vertically
     titleStatusContainer.style.marginLeft = imageUrl ? '5px' : '20px';  
     titleStatusContainer.style.marginTop = imageUrl ? '3px' : '10px'

    const title = document.createElement('h3');
    title.textContent = assistant.title  ? assistant.title : 'Chat Support';
    title.style.marginLeft = '7px'
    title.style.fontSize = '20px'
    title.style.width = '100%'
    title.style.fontWeight = '500'
    title.style.marginTop = '4px'
    title.style.marginBottom = '0';
    title.style.paddingBottom = '3px';
    // title.style.marginBottom = '-3px'; 

    const image = document.createElement('img');
    image.src = imageUrl;
    image.style.width = '50px';
    image.style.height = '50px';
    image.style.borderRadius = '99999px';
    image.style.marginLeft = '10px';
    image.style.display = imageUrl ? 'flex' : 'none';

    const buttonImage = document.createElement('img');
    buttonImage.src = 'https://linked-forge-ai.vercel.app/chat.svg'
    buttonImage.style.height = '35px'
    buttonImage.style.width = '35px'
    buttonImage.style.marginTop = '7px'

    button.appendChild(buttonImage)

    const status = document.createElement('p');
    status.textContent = statusText
    status.style.fontSize = '10px'
    status.style.marginLeft = '10px'
    status.style.marginTop = '0';
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
    form.style.height = '60px'
    form.style.marginTop = '7px'
    form.style.marginBottom = '7px'
    

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your question here...';
    input.id = 'userMessage';
    input.name = 'userMessage';
    Object.assign(input.style, inputStyles)

    const brand = document.createElement('p');
    brand.textContent = 'Powered by '
    brand.style.display = 'flex'
    brand.style.alignItems = 'flex-center'
    brand.style.justifyContent = 'center'
    brand.style.fontSize = '10px'
    brand.style.color = '#666666'
    brand.style.fontWeight = '600'
    brand.style.marginTop = '0'
    brand.style.marginBottom = '7px'

    const linkText = document.createElement('a');
    linkText.textContent = 'Linked Forge'

    const openingText = document.createElement('div')
    openingText.textContent = assistant.placeholder ? assistant.placeholder : 'Hi, I am your AI assistant, ask me anything!'
    openingText.style.backgroundColor = '#ffffff';
    openingText.style.marginTop = '12px'
    openingText.style.width = 'fit-content'
    openingText.style.maxWidth = '200px'

    openingText.style.marginLeft = '10px'
    openingText.style.marginRight = '10px'
    openingText.style.marginBottom = '4px';
    openingText.style.borderRadius = '8px';
    openingText.style.padding = '8px';
    openingText.style.fontSize = '14px'

    scrollableContent.appendChild(openingText)

    let userMessage = '';
    let chatHistory = [];


    // Event listeners
    button.addEventListener('click', () => {
        body.style.display = body.style.display === 'none' ? 'flex' : 'none';
        button.style.opacity = '1';
      });

      button.addEventListener('mouseenter', function () {
        if (body.style.display !== 'flex') {
          button.style.opacity = '0.75';
        }
      });

      button.addEventListener('mouseleave', function () {
        if (body.style.display !== 'flex') {
          button.style.opacity = '1';
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
        const response = await fetch('https://linked-forge-ai.vercel.app/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage, assistantId: aiId, sessionId }),
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

        scrollableContent.appendChild(openingText);
  
        chatHistory.forEach((message, index) => {
          
          const messageElement = document.createElement('div')
          const messageContainer = document.createElement('div')
          messageContainer.style.width = "100%"
          messageContainer.style.display = "flex"
          messageContainer.style.paddingTop = '10px'
         

          messageElement.style.alignItems = 'start';
          messageElement.style.marginLeft = '10px'
          messageElement.style.marginRight = '10px'
          messageElement.style.marginBottom = '4px';
          messageElement.style.borderRadius = '8px';
          messageElement.style.padding = '8px';
          messageElement.style.fontSize = '14px'
          messageElement.style.maxWidth = '200px'

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

        const lastMessageElement = scrollableContent.lastChild;
         if (lastMessageElement) {
           lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
           }
      }


    // Append inside the title container
    titleStatusContainer.appendChild(title);
    titleStatusContainer.appendChild(status);

    // Append inside the header
    header.appendChild(image);
    header.appendChild(titleStatusContainer)

    brand.appendChild(linkText)
    
    // Append inside of the body
    body.appendChild(header)
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
  
  