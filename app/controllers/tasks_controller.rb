# frozen_string_literal: true

class TasksController < ApplicationController
  load_and_authorize_resource :burst
  load_and_authorize_resource :task, through: :burst

  # GET /tasks
  # GET /tasks.json
  def index
    render json: @tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show; end

  # GET /tasks/1/edit
  def edit; end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = @burst.tasks.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def complete
    if @task.complete!
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def undo_complete
    if @task.incomplete!
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def task_params
    params.fetch(:task).permit(:description).merge(user: current_user)
  end
end
