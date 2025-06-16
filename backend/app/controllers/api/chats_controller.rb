class Api::ChatsController < ApplicationController
  def index
    sender_id = params[:sender_id]
    receiver_id = params[:receiver_id]
  
    messages = Chat.where(
      "(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      sender_id, receiver_id, receiver_id, sender_id
    ).includes(:sender, :receiver).order(:created_at)
  
    render json: messages.map { |msg|
      {
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        content: msg.content,
        created_at: msg.created_at.strftime("%Y-%m-%d %H:%M"),
        sender_name: msg.sender.first_name,
        receiver_name: msg.receiver.first_name
      }
    }
  end
  

  def create
    chat = Chat.new(chat_params)
    if chat.save
      render json: chat, status: :created
    else
      render json: { errors: chat.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  private

  def chat_params
    #Rails.logger.debug "Incoming params: #{params.inspect}"
    params.permit(:sender_id, :receiver_id, :content)
  end
end
