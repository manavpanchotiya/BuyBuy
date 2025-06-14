class ChatsController < ApplicationController
  def index
    sender_id = params[:sender_id]
    receiver_id = params[:receiver_id]

    messages = Chat.where(
      "(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      sender_id, receiver_id, receiver_id, sender_id
    ).order(:created_at)

    render json: messages.as_json(
      only: [:id, :content, :sender_id, :receiver_id, :created_at]
    )
  end
end
