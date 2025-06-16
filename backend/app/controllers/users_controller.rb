class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  # skip_before_action :verify_authenticity_token, only: [:create, :show]

  def create
    user = User.new(user_params)
    user.auth_token = SecureRandom.hex(20) if user.auth_token.blank?

    if user.save
      render json: {
        user: user.slice(:id, :email, :first_name, :last_name, :location),
        token: user.auth_token
      }, status: :created
    else
      render json: { error: user.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def show
    user = current_user
    if user
      render json: user.slice(:id, :email, :first_name, :last_name, :location)
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :location)
  end

  
end
