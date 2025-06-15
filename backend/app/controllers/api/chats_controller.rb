class Api::ChatsController < ApplicationController
  def index
    sender_id = params[:sender_id]
    receiver_id = params[:receiver_id]

    messages = Chat.where(
      "(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      sender_id, receiver_id, receiver_id, sender_id
    ).order(:created_at)

    render json: messages.as_json(
      only: [:id,  :sender_id, :receiver_id, :content, :created_at]
    )
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
