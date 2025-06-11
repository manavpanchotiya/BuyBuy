module Api
  class HelloController < ApplicationController
    def hello
      render json: { message: "Hello from Rails API!" }
    end
  end
end
