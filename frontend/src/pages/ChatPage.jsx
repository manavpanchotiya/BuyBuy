import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cable from "../cable";
import "../styles/chat_styles.css";

export default function ChatPage({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const chatBoxRef = useRef(null);
  const token = localStorage.getItem("token");

  // Axios config with Authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Load old messages when currentUserId or receiverId changes
  useEffect(() => {
    if (!currentUserId || !receiverId) return; // guard

    axios
      .get(`/api/chats/${currentUserId}/${receiverId}`, config)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [currentUserId, receiverId]);

  // Store subscription to send messages properly later
  const subscriptionRef = useRef(null);

  // Subscribe to ActionCable
  useEffect(() => {
    if (!currentUserId || !receiverId) return; // guard

    const channel = cable.subscriptions.create(
      {
        channel: "ChatChannel",
        sender_id: currentUserId,
        receiver_id: receiverId,
        token: token,
      },
      {
        received: (data) => {
          console.log("Received via ActionCable", data);
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    subscriptionRef.current = channel;

    return () => {
      channel.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [currentUserId, receiverId]);

  // Auto-scroll on messages update
  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  // Submit new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!subscriptionRef.current) {
      console.error("No active subscription to send message");
      return;
    }

    // Send message through ActionCable
    subscriptionRef.current.send({
      receiver_id: receiverId,
      content: content.trim(),
    });

    // Persist message to backend
    axios
      .post(
        "/api/chats",
        {
          chat: {
            receiver_id: receiverId,
            content: content.trim(),
          },
        },
        config
      )
      .catch((err) => console.error("Failed to save message:", err));

    setContent("");
  };

  return (
    <div className="chat-container">
      <div className="messages-list" ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`message ${
              msg.sender_id === currentUserId ? "sent" : "received"
            }`}
          >
            <div className="username">
              {msg.sender_id === currentUserId ? "You" : msg.sender_name || "User " + msg.sender_id}
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
