import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, user: true }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://genai-finance-backend.onrender.com/chat", // ✅ Use your Render backend URL
        { text: input }
      );

      console.log("Response from backend:", response.data); // ✅ Debugging log
      setMessages([...newMessages, { text: response.data.reply, user: false }]); // ✅ Displays AI reply
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 border w-96 mx-auto mt-5">
      <h2 className="text-xl font-bold mb-2">Chatbot</h2>
      <div className="border p-4 h-64 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.user ? "text-right text-blue-500" : "text-left text-gray-700"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="border p-2 flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

