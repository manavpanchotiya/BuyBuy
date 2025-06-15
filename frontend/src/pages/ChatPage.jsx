import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cable from "../cable"; 
import '../styles/chat_styles.css';

export default function ChatPage({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const chatBoxRef = useRef(null);

  // Load old messages
  useEffect(() => {
    axios
      .get(`/api/chats/${currentUserId}/${receiverId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [currentUserId, receiverId]);

  // Subscribe to ActionCable
  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: "ChatChannel",
        sender_id: currentUserId,
        receiver_id: receiverId,
      },
      {
        received: (data) => {
          console.log("Received visa ActionaCable", data);
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [currentUserId, receiverId]);

  // Auto-scroll to latest
  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  // Submit new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    cable.subscriptions.subscriptions[0]?.send({
      sender_id: currentUserId,
      receiver_id: receiverId,
      content: content.trim(),
    });

    axios
      .post("/api/chats", {
        sender_id: currentUserId,
        receiver_id: receiverId,
        content: content.trim(),
      })
    .catch((err) => console.error("Failed to save message:", err));

    setContent("");
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4" ref={chatBoxRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 max-w-xs px-4 py-3 rounded-xl ${
              msg.sender_id === currentUserId
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-200 text-left"
            }`}
          >
            <div className="text-sm font-bold">
              {msg.sender_id === currentUserId ? "You" : "User " + msg.sender_id}
            </div>
            <div className="text-base">{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1">{msg.created_at}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <textarea
          rows={2}
          className="flex-1 p-2 border rounded resize-none"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
