class AdminDashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    products = Product.all
    render json: products
  end

  private

  def require_admin
    unless current_user&.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
