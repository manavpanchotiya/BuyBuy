class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split('Bearer ')&.last
    user = User.find_by(auth_token: token)

    if user
      @current_user = user
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    token = request.headers['Authorization']&.split(' ')&.last
    User.find_by(auth_token: token)
  end
end
