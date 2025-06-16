Rails.application.routes.draw do
  # Products RESTful routes, including create for new product POST
  resources :products, only: [:index, :show, :create, :update, :destroy]

  # Favorites routes
  resources :favourites, only: [:index, :create, :destroy]

  # Custom seller route to list products of current user
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
