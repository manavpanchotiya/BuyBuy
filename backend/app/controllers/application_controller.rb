class ApplicationController < ActionController::API
  # skip_forgery_protection
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    user = User.find_by(auth_token: token)

    if user
      @current_user = user
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= begin
      token = request.headers['Authorization']&.split(' ')&.last
      User.find_by(auth_token: token)
    end
  end
end
