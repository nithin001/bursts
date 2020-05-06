# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render html: '', layout: 'react'
  end

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
    page = params[:page] ? params[:page].to_i : 0
    render json: Feed.new(current_user, from_date, end_date, page).as_json
    # render json: { from_date: from_date, end_date: end_date }
  end

  private

  def from_date
    unless params[:from_date]
      return 7.days.ago
    end

    Date.parse(params[:from_date])
  end

  def end_date
    unless params[:end_date]
      return 7.days.ago
    end

    Date.parse(params[:end_date])
  end
end
