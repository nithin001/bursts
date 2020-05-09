# frozen_string_literal: true

class Api::WorksController < ApplicationController
  load_and_authorize_resource :work

  # GET /works
  # GET /works.json
  def index
    render json: @works.where(burst_id: params[:burst_id]).to_json(include: :task)
  end

  # POST /works
  # POST /works.json
  def create
    @work = Work.new(work_params)
    if @work.save
      render json: @work.to_json(include: :task)
    else
      render json: @work.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /works/1
  # PATCH/PUT /works/1.json
  def worked
    task_completed = params[:complete_task] && params[:complete_task] == true
    if @work.worked!
      @work.task.completed! if task_completed
      render json: @work.to_json(include: :task)
    else
      render json: @work.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /works/1
  # PATCH/PUT /works/1.json
  def undo_worked
    if @work.skipped! && @work.task.active!
      render json: @work.to_json(include: :task)
    else
      render json: @work.errors, status: :unprocessable_entity
    end
  end

  # DELETE /works/1
  # DELETE /works/1.json
  def destroy
    @work.destroy
    respond_to do |format|
      format.html { redirect_to works_url, notice: 'Work was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def work_params
    params.fetch(:work).permit(%i[burst_id task_id]).merge(user: current_user)
  end
end
