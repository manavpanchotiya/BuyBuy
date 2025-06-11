class ApiController < ApplicationController
  def hello
    render json: { message: "Hello from Rails!" }
  end
end
