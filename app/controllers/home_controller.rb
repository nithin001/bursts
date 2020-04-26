# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    @burst = Burst.current_burst(current_user)
  end
end
