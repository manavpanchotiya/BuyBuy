Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :products, only: [:index, :show]
  resources :chats, only: [:index, :create]

  get "/seller", to: "products#seller"
  get "/categories", to: "categories#index"
end
