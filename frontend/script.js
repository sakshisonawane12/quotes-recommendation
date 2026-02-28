// Particle animation background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, -60px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// Rasa API Configuration
const RASA_API_URL = 'http://localhost:5005/webhooks/rest/webhook';

// Quote responses (fallback if Rasa is not running)
const quotes = {
    motivation: [
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Success doesn't just find you. You have to go out and get it.",
        "The harder you work for something, the greater you'll feel when you achieve it."
    ],
    inspiration: [
        "The only way to do great work is to love what you do.",
        "Believe you can and you're halfway there.",
        "Your limitation—it's only your imagination.",
        "Dream it. Wish it. Do it."
    ],
    love: [
        "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every single day.",
        "In all the world, there is no heart for me like yours.",
        "You are my today and all of my tomorrows.",
        "I love you not only for what you are, but for what I am when I am with you."
    ],
    funny: [
        "I'm not lazy, I'm just on energy-saving mode.",
        "I'm not arguing, I'm just explaining why I'm right.",
        "Life is short. Smile while you still have teeth.",
        "I don't need a hair stylist, my pillow gives me a new hairstyle every morning."
    ],
    success: [
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "The secret of success is to do the common thing uncommonly well.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Don't be afraid to give up the good to go for the great."
    ]
};

// DOM Elements
const categoryCards = document.querySelectorAll('.category-card');
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteText = document.getElementById('quoteText');
const quoteCategory = document.getElementById('quoteCategory');

// Event Listeners
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const intent = card.dataset.intent;
        handleCategoryClick(intent);
    });
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle category card click
function handleCategoryClick(intent) {
    const messages = {
        motivation: "I need motivation",
        inspiration: "Inspire me",
        love: "Give me a romantic quote",
        funny: "Make me laugh",
        success: "Quote about success"
    };
    
    addUserMessage(messages[intent]);
    sendToRasa(messages[intent], intent);
}

// Send message
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    
    sendToRasa(message);
}

// Add user message to chat
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message-container';
    messageDiv.innerHTML = `
        <div class="user-avatar">👤</div>
        <div class="message-bubble user-message-bubble">
            <p>${message}</p>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="message-bubble bot-message">
            <p>${message}</p>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message typing-message';
    typingDiv.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="message-bubble bot-message">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingDiv;
}

// Send message to Rasa
async function sendToRasa(message, intent = null) {
    const typingIndicator = showTypingIndicator();
    
    try {
        const response = await fetch(RASA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: 'user',
                message: message
            })
        });
        
        typingIndicator.remove();
        
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                const botResponse = data[0].text;
                addBotMessage(botResponse);
                displayQuote(botResponse, intent || detectIntent(message));
            } else {
                handleFallback(intent || detectIntent(message));
            }
        } else {
            throw new Error('Rasa server not responding');
        }
    } catch (error) {
        console.log('Using fallback quotes (Rasa server not running)');
        typingIndicator.remove();
        handleFallback(intent || detectIntent(message));
    }
}

// Detect intent from message
function detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('motivat')) return 'motivation';
    if (lowerMessage.includes('inspir')) return 'inspiration';
    if (lowerMessage.includes('love') || lowerMessage.includes('romantic')) return 'love';
    if (lowerMessage.includes('funny') || lowerMessage.includes('laugh')) return 'funny';
    if (lowerMessage.includes('success')) return 'success';
    return 'motivation'; // default
}

// Handle fallback when Rasa is not available
function handleFallback(intent) {
    const quote = quotes[intent][Math.floor(Math.random() * quotes[intent].length)];
    addBotMessage(quote);
    displayQuote(quote, intent);
}

// Display quote in the quote display section
function displayQuote(quote, category) {
    quoteText.textContent = quote;
    quoteCategory.textContent = category.toUpperCase();
    quoteDisplay.classList.remove('active');
    
    setTimeout(() => {
        quoteDisplay.classList.add('active');
    }, 100);
}

// Add welcome animation on load
window.addEventListener('load', () => {
    // Page loads directly without loading screen
    document.body.style.opacity = '1';
});

// Add hover sound effect (optional - can be enabled)
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
