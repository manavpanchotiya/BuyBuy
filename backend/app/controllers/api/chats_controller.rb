class Api::ChatsController < ApplicationController
  before_action :authenticate_user!

  def index
  sender_id = params[:sender_id]
  receiver_id = params[:receiver_id]

  chats = Chat.where(sender_id: sender_id, receiver_id: receiver_id)
              .or(Chat.where(sender_id: receiver_id, receiver_id: sender_id))
              .includes(:sender)

  render json: chats.map { |chat|
    chat.as_json(only: [:id, :sender_id, :receiver_id, :content, :created_at]).merge(
      sender_name: chat.sender.first_name
    )
  }
end

  def create
    chat = Chat.new(chat_params)
    chat.sender_id = current_user.id

    if chat.save
      render json: chat
    else
      render json: { error: chat.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:content, :receiver_id)
  end
end
