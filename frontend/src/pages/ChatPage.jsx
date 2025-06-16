import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cable from "../cable";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

export default function ChatPage({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const chatBoxRef = useRef(null);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    axios
      .get(`/api/chats/${currentUserId}/${receiverId}`, config)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [currentUserId, receiverId]);

  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    const channel = cable.subscriptions.create(
      {
        channel: "ChatChannel",
        sender_id: currentUserId,
        receiver_id: receiverId,
        token: token,
      },
      {
        received: (data) => {
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

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!subscriptionRef.current) {
      console.error("No active subscription to send message");
      return;
    }

    subscriptionRef.current.send({
      receiver_id: receiverId,
      content: content.trim(),
    });

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
    <Box
      sx={{
        maxWidth: 600,
        height: "80vh",
        margin: "1rem auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box
        ref={chatBoxRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "background.default",
        }}
      >
        {messages.map((msg, idx) => {
          const isSent = msg.sender_id === currentUserId;

          return (
            <Box
              key={msg.id || idx}
              sx={{
                maxWidth: "75%",
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: isSent ? "primary.main" : "grey.300",
                color: isSent ? "primary.contrastText" : "text.primary",
                alignSelf: isSent ? "flex-end" : "flex-start",
                boxShadow: 1,
                wordBreak: "break-word",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", opacity: 0.7, mb: 0.3 }}
              >
                {isSent ? "You" : msg.sender_name || `User ${msg.sender_id}`}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {msg.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", textAlign: "right", opacity: 0.5, mt: 0.5 }}
              >
                {new Date(msg.created_at).toLocaleString()}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider />

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          multiline
          maxRows={4}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!content.trim()}
          sx={{ whiteSpace: "nowrap" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
