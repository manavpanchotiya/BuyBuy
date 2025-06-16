class ChatChannel < ApplicationCable::Channel
  def subscribed
    reject unless authenticate_user(params[:token])
    # Rails.logger.info "User #{@current_user.id} subscribed to chat stream #{stream_handler}"

    @sender = @current_user
    @receiver = User.find_by(id: params[:receiver_id])
    if @receiver
      # Use sorted IDs to create consistent stream name regardless of who is sender or receiver
      stream_name = "chat_#{[@sender.id, @receiver.id].sort.join('_')}"
      stream_from stream_name
    else
      reject
    end
  end

  def receive(data)
    return unless @sender && @receiver

    chat = Chat.create!(
      sender: @sender,
      receiver: @receiver,
      content: data["content"]
    )

    stream_name = "chat_#{[@sender.id, @receiver.id].sort.join('_')}"

    ActionCable.server.broadcast(
      stream_name,
      {
        id: chat.id,
        content: chat.content,
        sender_id: chat.sender_id,
        receiver_id: chat.receiver_id,
        created_at: message.created_at.strftime("%Y-%m-%d %H:%M"),
        sender_name: chat.sender.first_name
      }
    )
  end

  private

  def authenticate_user(token)
    user = User.find_by(auth_token: token)
    if user
      @current_user = user
      true
    else
      false
    end
  end
end
