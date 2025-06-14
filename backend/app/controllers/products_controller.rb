class ProductsController < ApplicationController
  def index
    products = Product.includes(:user, :category)
    products = products.where(swappable: true) if params[:swappable] == 'true'
  
    render json: products.as_json(
      only: [:id, :name, :description, :quantity, :price_in_cents, :image, :swappable],
      include: {
        user: { only: [:first_name, :user_location] },
        category: { only: [:name] }
      }
    )
  end
  

  def show
    product = Product.includes(:user, :category).find(params[:id])
  
    render json: product.as_json(
      only: [:id, :name, :price_in_cents, :description, :image, :quantity,],
      include: {
        user: { only: [:first_name, :user_location] },
        category: { only: [:name] }
      }
    )
  end  

  def similar
    product = Product.find(params[:id])
    similar = Product.where.not(id: product.id)
                     .where("category = ? OR location = ? OR user_id = ?", product.category, product.location, product.user_id)
                     .limit(4)
    render json: similar, include: :user
  end
  

  def seller
    user = User.find(1)
    products = user.products.includes(:category)

    render json: products.as_json(
      only: [:id, :name, :price_in_cents, :description, :image, :quantity],
      include: {
        user: { only: [:first_name] },
        category: { only: [:name] }
      }
    )
  end
end
