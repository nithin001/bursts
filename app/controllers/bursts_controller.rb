# frozen_string_literal: true

class BurstsController < ApplicationController
  load_and_authorize_resource :burst

  # GET /bursts
  # GET /bursts.json
  def index; end

  # GET /bursts/1
  # GET /bursts/1.json
  def show; end

  # POST /bursts
  # POST /bursts.json
  def create
    @burst = Burst.new(user: current_user)
    @burst.started_at = Time.now
    @burst.status = 'draft'
    respond_to do |format|
      if @burst.save
        format.json { render :show, status: :created, location: @burst }
      else
        format.json { render json: @burst.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def start
    respond_to do |format|
      if @burst.active!
        format.json { render :show, status: :ok, location: @burst }
      else
        format.json { render json: @burst.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def complete
    respond_to do |format|
      if @burst.completed!
        format.json { render :show, status: :ok, location: @burst }
      else
        format.json { render json: @burst.errors, status: :unprocessable_entity }
      end
    end
  end
end
