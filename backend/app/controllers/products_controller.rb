class ProductsController < ApplicationController
  def index
    products = Product.includes(:user, :category).all

    render json: products.as_json(
      only: [:id, :name, :price_in_cents, :description, :image], # include the price here
      include: {
        user: { only: [:first_name, :user_location] },
        category: { only: [:name] }
      }
    )
  end
end
