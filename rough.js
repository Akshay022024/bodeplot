// Array of predefined responses
const responses = {
  "hello": "Hello there! How can I assist you today?",
  "how are you": "I'm just a robot, but I'm feeling great! How about you?",
  "what is your name": "My name is Lisa, the friendly robot!",
  "bye": "Goodbye! Have a great day!",
  // Add more key-value pairs for different responses
};

const textElement = document.getElementById('robotText');
const replyBtn = document.getElementById('replyBtn');
const userInput = document.getElementById('userInput');

// Function to change text based on user input
function replyToUser() {
  const userText = userInput.value.toLowerCase().trim();
  const reply = responses[userText] || "Sorry, I don't understand. I'm going to available soon.";
  textElement.textContent = reply;
  userInput.value = ''; // Clear input field
}

// Add event listener for the reply button
replyBtn.addEventListener('click', replyToUser);

// Allow user to press 'Enter' key to send input
userInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      replyToUser();
  }
});
