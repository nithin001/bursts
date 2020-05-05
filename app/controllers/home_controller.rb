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

  def feed
    from_date = params[:from_date] ? Date.parse(params[:from_date]) : 7.days.ago
    to_date = params[:to_date] ? Date.parse(params[:to_date]) : Date.today
    page = params[:page] ? params[:page].to_i : 0
    render json: Feed.new(current_user, from_date, to_date, page).as_json
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
