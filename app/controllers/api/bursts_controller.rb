# frozen_string_literal: true

class Api::BurstsController < ApplicationController
  load_and_authorize_resource :burst

  # GET /bursts
  # GET /bursts.json
  def index
    bursts = @bursts.page(params[:page]).per(20)
    render json: {
      bursts: bursts.as_json({ methods: %i[humanized_time_taken humanized_from_to humanized_completed_at], include: { works: { include: :task } } }),
      count: bursts.total_count
    }
  end

  # GET /bursts/1
  # GET /bursts/1.json
  def show
    render json: @burst.to_json({ methods: :humanized_time_taken })
  end

  # POST /bursts
  # POST /bursts.json
  def create
    @burst = Burst.new(user: current_user)
    @burst.status = 'draft'
    if @burst.save
      render json: @burst.to_json({ methods: :humanized_time_taken })
    else
      render { render json: @burst.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def start
    if @burst.active!
      @burst.started_at = Time.now
      @burst.save!
      render json: @burst.to_json({ methods: :humanized_time_taken })
    else
      render json: @burst.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def complete
    if @burst.completed!
      @burst.completed_at = Time.now
      @burst.save!
      render json: @burst.to_json({ methods: :humanized_time_taken })
    else
      render json: @burst.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def notified
    if @burst.notified!
      @burst.save!
      render json: @burst.to_json({ methods: :humanized_time_taken })
    else
      render json: @burst.errors, status: :unprocessable_entity
    end
  end
end
