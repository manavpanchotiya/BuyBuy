class FavouritesController < ApplicationController
  before_action :authenticate_user!

  def index
    favourites = current_user.favourite_products
    render json: favourites
  end

  
  def create
    favourite = current_user.favourites.new(product_id: params[:product_id])
    if favourite.save
      render json: favourite.product, status: :created
    else
      render json: { errors: favourite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  
  def destroy
    favourite = current_user.favourites.find_by(product_id: params[:id])
    if favourite&.destroy
      head :no_content
    else
      render json: { error: "Favourite not found" }, status: :not_found
    end
  end
end
