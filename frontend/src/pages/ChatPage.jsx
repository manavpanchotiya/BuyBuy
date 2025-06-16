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
          console.log("Received via ActionaCable", data);
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
    <div className="chat-container">
      <div className="messages-list" ref={chatBoxRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender_id === currentUserId
                ? "sent"
                : "received"
            }`}
          >
            <div className="username">
              {msg.sender_id === currentUserId ? "You" : msg.sender_name}
            </div>
            <div className="text-base">{msg.content}</div>
            <div className="timestamp">{msg.created_at}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-group">
        <textarea
          rows={2}
          className="message-input"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
