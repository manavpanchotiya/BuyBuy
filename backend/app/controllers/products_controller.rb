class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show, :seller]
  before_action :set_product, only: [:destroy]
  before_action :authorize_owner!, only: [:destroy]

  def index
    products = Product.distinct.includes(:user, :category)
    products = products.where(swappable: true) if params[:swappable] == 'true'
  
    render json: products.as_json(
      only: [:id, :name, :description, :quantity, :price_in_cents, :image, :swappable],
      include: {
        user: { only: [:id, :first_name, :user_location] },
        category: { only: [:name] }
      }
    )
  end

  def show
    product = Product.includes(:user, :category).find(params[:id])
    render json: product.as_json(
      only: [:id, :name, :price_in_cents, :description, :image, :quantity],
      include: {
        user: { only: [:id, :first_name, :user_location] },
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
    if current_user.nil?
      render json: { error: "Not authorized" }, status: :unauthorized
    else
      products = current_user.products.includes(:category)
      render json: products.as_json(
        only: [:id, :name, :price_in_cents, :description, :image, :quantity],
        include: {
          user: { only: [:id, :first_name] },
          category: { only: [:name] }
        }
      )
    end
  end

  def create
    if current_user.nil?
      render json: { error: "Not authorized" }, status: :unauthorized
    else
      product = current_user.products.build(product_params)
      if product.save
        render json: product, status: :created
      else
        render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @product.destroy
      head :no_content
    else
      render json: { error: "Failed to delete product" }, status: :unprocessable_entity
    end
  end

  private

  def set_product
    @product = Product.find_by(id: params[:id])
    unless @product
      render json: { error: "Product not found" }, status: :not_found
    end
  end

  def authorize_owner!
    unless @product.user_id == current_user.id || current_user.admin?
      render json: { error: "Forbidden" }, status: :forbidden
    end
  end

  def product_params
    params.require(:product).permit(:name, :description, :price_in_cents, :image, :quantity, :category_id)
  end
end
