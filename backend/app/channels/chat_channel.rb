class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_name
  end

  def receive(data)
    message = Chat.create!(
      sender_id: data["sender_id"],
      receiver_id: data["receiver_id"],
      content: data["content"]
    )

    ActionCable.server.broadcast(
      stream_name_for(data["sender_id"], data["receiver_id"]),
      {
        id: message.id,
        content: message.content,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        sender_name: message.sender.first_name,
        created_at: message.created_at.strftime("%Y-%m-%d %H:%M")
      }
    )
  end

  private

  def stream_name
    stream_name_for(params["sender_id"], params["receiver_id"])
  end

  def stream_name_for(id1, id2)
    ids = [id1, id2].sort
    "chat_#{ids[0]}_#{ids[1]}"
  end
end
