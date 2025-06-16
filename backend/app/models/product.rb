class Product < ApplicationRecord
  belongs_to :category
  belongs_to :user

  has_many :favourites, dependent: :destroy
  has_many :favourited_by_users, through: :favourites, source: :user
  
end
