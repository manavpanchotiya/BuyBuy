class ChatsController < ApplicationController
  def index
    sender_id = params[:sender_id]
    receiver_id = params[:receiver_id]

    chats = Chat.where(sender_id: sender_id, receiver_id: receiver_id)
    .or(Chat.where(sender_id: receiver_id, receiver_id: sender_id))
    .order(:created_at)

    render json: chats
  end

  def create
    chat = Chat.create!(chat_params)
      ActionCable.server.broadcast("chat_#{chat_key(chat.sender_id, chat.receiver_id)}", {
        id: chat.id,
        content: chat.content,
        sender_id: chat.sender_id,
        receiver_id: chat.receiver_id,
        created_at: chat.created_at,
        sender_name: chat.sender.first_name
    })

    render json: chat
  end

  private

  def chat_params
    params.require(:chat).permit(:content, :sender_id, :receiver_id)
  end

  def chat_key(id1, id2)
    [id1, id2].sort.join("_")
  end
end 
