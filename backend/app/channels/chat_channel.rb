class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat_#{chat_key(params[:sender_id], params[:receiver_id])}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def chat_key(user1_id, user2_id)
    [user1_id, user2_id].sort.join("_")
  end
  
end
