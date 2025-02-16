// Chatbot.js
import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, user: true }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://your-backend-url.onrender.com/chat",  // Replace with your Render backend URL
        { text: input }
      );

      setMessages([...newMessages, { text: response.data.reply, user: false }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Error: Unable to get AI response", user: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border w-96 mx-auto mt-5 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Finance AI Chatbot</h2>
      <div className="border p-4 h-64 overflow-auto bg-gray-100 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.user ? "text-right text-blue-500" : "text-left text-gray-700"}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-500">AI is thinking...</p>}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="border p-2 flex-grow rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
