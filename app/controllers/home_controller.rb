# frozen_string_literal: true

class HomeController < ApplicationController
  def index; end

  def burst
    burst = current_user.bursts.first
    if burst.present?
      render json: { id: burst.id }
    else
      render json: {}
    end
  end

  def tasks
    query = params[:query] || ''
    tasks = current_user.tasks
                        .where('lower(tasks.description) like ?', "%#{query.downcase}%")
                        .limit(5)
    render json: tasks.pluck(:description).uniq
  end

  def user
    render json: {
      name: current_user.name
    }
  end

  def stats
    render json: Stats.new(current_user).as_json
  end

  # def start
  #   Burst.start_current_burst(current_user)

  #   render json: { status: 'ok' }
  # end

  # def complete_task
  #   Burst.complete_task(params[:id], current_user)

  #   render json: { status: 'ok' }
  # end

  # def complete
  #   Burst.complete_current_burst(current_user)

  #   render json: { status: 'ok' }
  # end
end
