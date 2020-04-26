# frozen_string_literal: true

class BurstsController < ApplicationController
  load_and_authorize_resource :burst

  # GET /bursts
  # GET /bursts.json
  def index; end

  # GET /bursts/1
  # GET /bursts/1.json
  def show; end

  # GET /bursts/new
  def new
    @burst = Burst.draft.where(user: current_user).first_or_create
  end

  # GET /bursts/1/edit
  def edit; end

  # POST /bursts
  # POST /bursts.json
  def create
    @burst = Burst.new(burst_params)

    respond_to do |format|
      if @burst.save
        format.html { redirect_to @burst, notice: 'Burst was successfully created.' }
        format.json { render :show, status: :created, location: @burst }
      else
        format.html { render :new }
        format.json { render json: @burst.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bursts/1
  # PATCH/PUT /bursts/1.json
  def update
    respond_to do |format|
      if @burst.update(burst_params)
        format.html { redirect_to @burst, notice: 'Burst was successfully updated.' }
        format.json { render :show, status: :ok, location: @burst }
      else
        format.html { render :edit }
        format.json { render json: @burst.errors, status: :unprocessable_entity }
      end
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

  # Only allow a list of trusted parameters through.
  def burst_params
    params.fetch(:burst).permit(:name).merge(user: current_user)
  end
end
