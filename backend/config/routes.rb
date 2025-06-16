Rails.application.routes.draw do
  # Mount Action Cable for WebSocket connections
  mount ActionCable.server => '/cable'

  # API namespace for chat routes
  namespace :api do
    get "chats/:sender_id/:receiver_id", to: "chats#index"
    post "chats", to: "chats#create"
  end

  # Products RESTful routes (full CRUD)
  resources :products, only: [:index, :show, :create, :update, :destroy]

  # Favorites routes
  resources :favourites, only: [:index, :create, :destroy]

  # Custom route for seller’s products
  get "/seller", to: "products#seller"

  # Categories index route
  get "/categories", to: "categories#index"

  # Admin dashboard route
  get '/admin', to: 'admin_dashboard#index'

  # Authentication routes
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
end
