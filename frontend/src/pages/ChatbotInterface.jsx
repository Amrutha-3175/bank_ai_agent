import { useState, useEffect } from "react";
import "./ChatbotInterface.css";

function ChatbotInterface() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const suggestedQuestions = [
  "What is EMI?",
  "What is a Home Loan?",
  "How does KYC work?",
  "Am I eligible for a Personal Loan?"
];

const handleSuggestionClick = (question) => {
  setMessage(question);
};
const clearChat = () => {

  setChat([]);

  localStorage.removeItem(
    chatKey
  );

};

const userPhone =
  localStorage.getItem("userPhone");

const chatKey =
  `chatHistory_${userPhone}`;

useEffect(() => {

  const savedChat =
    localStorage.getItem(chatKey);

  if(savedChat){
    setChat(
      JSON.parse(savedChat)
    );
  }

}, [chatKey]);

useEffect(() => {

  localStorage.setItem(
    chatKey,
    JSON.stringify(chat)
  );

}, [chat, chatKey]);


  const handleSend = async () => {
   
  if (message.trim() === "") return;
   setLoading(true);
  const userMessage = {
    sender: "user",
    text: message
  };

  setChat((prev) => [...prev, userMessage]);
  
  try {

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      }
    );

    const data = await response.json();

    const botMessage = {
      sender: "bot",
      text: data.response
    };

    setChat((prev) => [
      ...prev,
      botMessage
    ]);

  } catch (error) {

    const botMessage = {
      sender: "bot",
      text: "Backend connection failed."
    };

    setChat((prev) => [
      ...prev,
      botMessage
    ]);
    setLoading(false);
  }
   setLoading(false);
  setMessage("");
};

  return (
    <div className="chat-container">

      <div className="chat-card">

  <div className="chat-header">

    <h1>AI Banking Assistant</h1>

    <button
      className="clear-btn"
      onClick={clearChat}
    >
      Clear Chat
    </button>

  </div>

  <div className="chat-box">
          
          {chat.map((msg, index) => (
             
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "user-message"
                  : "bot-message"
              }
            >
              
              {msg.text}
            </div>

          ))}
            {loading && (
  <div className="bot-message">
    BankAI is thinking...
  </div>
)}
        </div>
         <div className="suggestion-container">

  {suggestedQuestions.map((question, index) => (

    <button
      key={index}
      className="suggestion-btn"
      onClick={() =>
        handleSuggestionClick(question)
      }
    >
      {question}
    </button>

  ))}

</div>
        <div className="input-section">

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button onClick={handleSend}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatbotInterface;