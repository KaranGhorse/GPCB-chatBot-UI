async function askQuestion(question) {
    try {
        const response = await axios.post('https://gpcb-chatbot.onrender.com/api/question', {
            question: question
        });

        const msg = response.data;
        console.log(msg);
        
        const botMessage = createMessage(msg.answer, false);
        botMessage.scrollIntoView();
    } catch (error) {
        console.error('Error:', error);
    }
}


const chatButton = document.getElementById("chat-button");
const chatContainer = document.getElementById("chatContainer");
const minimizeButton = document.getElementById("minimize-button");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("conversation-group");
const sendButton = document.getElementById("SentButton");

if (chatButton) {
    chatButton.addEventListener("click", function () {
        if (chatContainer) {
            chatContainer.classList.add("open");
            chatButton.classList.add("clicked");
        }
    });
}

if (minimizeButton) {
    minimizeButton.addEventListener("click", function () {
        if (chatContainer) {
            chatContainer.classList.remove("open");
            chatButton.classList.remove("clicked");
        }
    });
}

// todo msg maker
function createMessage(message, isUser = true) {
    const newMessage = document.createElement('div');
    newMessage.classList.add(isUser ? 'sentText' : 'botText');
    if (newMessage.classList.contains('sentText')) {
        newMessage.innerHTML = `<span class='sentSpan' >${message}</span>`;
    }
    else{
        newMessage.innerHTML = `<span>${message}</span>`;
    }
    chatMessages.appendChild(newMessage);
    return newMessage;
}

//! todo not in use
// function chatbotResponse() {
//     const messages = ["Hello!", "How can I assist you?", "Let me know if you have any further questions"];
//     const randomIndex = Math.floor(Math.random() * messages.length);
//     const message = messages[randomIndex];
//     const botMessage = createMessage(message, false);
//     botMessage.scrollIntoView();
// }

chatInput.addEventListener("input", function (event) {
    if (event.target.value) {
        sendButton.classList.add("svgsent");
    } else {
        sendButton.classList.remove("svgsent");
    }
});

chatInput.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        const message = chatInput.value;    
        if (message.length < 1) {
            return
        }
        chatInput.value = "";
        const userMessage = createMessage(message);
        userMessage.scrollIntoView();
        // setTimeout(chatbotResponse, 1000);
        askQuestion(message)
        sendButton.classList.add("svgsent");
    }
});

if (sendButton) {
    sendButton.addEventListener("click", function () {
        const message = chatInput.value;
        if (message.length < 1) {
            return
        }
        chatInput.value = "";
        const userMessage = createMessage(message);
        userMessage.scrollIntoView();
        askQuestion(message)
        // setTimeout(chatbotResponse, 1000);
        sendButton.classList.add("svgsent");
    });
}
