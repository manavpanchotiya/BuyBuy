class CategoriesController < ApplicationController
  def index
    categories = Category.select('MIN(id) as id, name').group(:name).order(:name)
     render json: categories
  end
end
