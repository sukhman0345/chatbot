const API_KEY = "AIzaSyDRhs7yeKVPg565_AMNI5uPfuyjm2UCZ7I";  // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chatBox = document.getElementById("chat-box"); // GEt the chat display area
const userInput = document.getElementById("user-input"); //GEt the userInput

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, "user-message");
    userInput.value = "";

    // Call Gemini API
    try {
        const botResponse = await fetchResponse(userMessage);
        displayMessage(botResponse, "bot-message");
    } catch (error) {
        displayMessage("Oops! Something went wrong.", "bot-message");
        console.error("API Error:", error);
    }
}

// Function to display messages
function displayMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Fetch response from Gemini AI API
async function fetchResponse(userMessage) {
    const requestBody = {
        "contents": [{
            "parts": [{ "text": userMessage }]
        }]
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    // Extract the response text from the API response
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
}

// Enter key to send message
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
