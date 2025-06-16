class User < ApplicationRecord
  has_many :favourites, dependent: :destroy
  has_many :favourite_products, through: :favourites, source: :product
  
  has_secure_password
  
  has_many :products
  has_many :sent_chats, class_name: "Chat", foreign_key: "sender_id", dependent: :destroy
  has_many :received_chats, class_name: "Chat", foreign_key: "receiver_id", dependent: :destroy

  validates :email, presence: true, uniqueness: true

  # Add this callback to generate token before user creation
  before_create :generate_auth_token

  private

  def generate_auth_token
    self.auth_token = SecureRandom.hex(20) if auth_token.blank?  # 40-char random hex string
  end
end
