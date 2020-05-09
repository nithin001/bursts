# frozen_string_literal: true

class Api::TasksController < ApplicationController
  load_and_authorize_resource :task

  # GET /tasks
  # GET /tasks.json
  def index
    tasks_with_filter = params[:only_active] && params[:only_active] == 'true' ?  @tasks.active : @tasks
    tasks = tasks_with_filter.page(params[:page]).per(20)
    render json: {
      tasks: tasks,
      count: tasks.total_count
    }
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show; end

  # GET /tasks/1/edit
  def edit; end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)
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

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def complete
    if @task.completed!
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def undo_complete
    if @task.active!
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def task_params
    params.fetch(:task).permit(:description).merge(user: current_user)
  end
end
