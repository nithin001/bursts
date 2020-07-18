# frozen_string_literal: true

class Api::BurstsController < ApplicationController
  load_and_authorize_resource :burst

  # GET /bursts
  # GET /bursts.json
  def index

    bursts = @bursts.on_date(date_param)
    render json: {
      bursts: bursts.as_json({ methods: %i[humanized_time_taken humanized_from_to humanized_completed_at], include: { works: { include: :task } } }),
    }
  end

  def active_dates
    dates = @bursts.group_by(&:completed_day).map {|completed_at, _| completed_at}.compact
    render json: dates
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

  # POST /bursts
  # POST /bursts.json
  def create_post_dated_burst
    @burst = Burst.new(user: current_user)
    @burst.status = 'completed'
    @burst.started_at = date_param.in_time_zone.beginning_of_day + params[:started_at].to_i * 60
    @burst.completed_at = date_param.in_time_zone.beginning_of_day + params[:completed_at].to_i * 60
    @burst.task_ids = params[:task_ids]
    @burst.works.each(&:worked!)
    if @burst.save
      render json: @burst.to_json({ methods: :humanized_time_taken })
    else
      render json: @burst.errors, status: :unprocessable_entity
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

  # DELETE /bursts/1
  # DELETE /bursts/1.json
  def destroy
    @burst.destroy
    respond_to do |format|
      format.html { redirect_to bursts_url, notice: 'Burst was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def date_param
    params[:date] && Date.parse(params[:date]) rescue nil ? Date.parse(params[:date]) : Date.today
  end
end
