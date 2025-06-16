class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  # skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      user.update!(auth_token: SecureRandom.hex(20))
      render json: {
        message: 'Logged in successfully',
        token: user.auth_token,
        user: user.slice(:id, :email, :first_name, :last_name, :location),
        admin: user.admin
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    token = request.headers['Authorization']&.split(' ')&.last
    if token && (user = User.find_by(auth_token: token))
      user.update!(auth_token: nil)
    end
    render json: { message: 'Logged out successfully' }
  end
end
