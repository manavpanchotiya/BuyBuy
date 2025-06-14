import { useParams } from "react-router-dom";
import ChatPage from "../pages/ChatPage";

const ChatWrapper = () => {
  const { receiverId } = useParams();
  const currentUserId = 1; // hardcoded for now

  return (
    <ChatPage
      currentUserId={currentUserId}
      receiverId={parseInt(receiverId)}
    />
  );
};

export default ChatWrapper;
