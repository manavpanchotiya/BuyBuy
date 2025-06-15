import { useParams } from "react-router-dom";
import ChatPage from "../pages/ChatPage";

const ChatWrapper = () => {
  const { receiverId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const currentUserId = parseInt(searchParams.get("user_id") || 1);

  return (
    <ChatPage
      currentUserId={currentUserId}
      receiverId={parseInt(receiverId)}
    />
  );
};

export default ChatWrapper;
