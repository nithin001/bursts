# frozen_string_literal: true

class HomeController < ApplicationController
  def index; end

  def current
    current_burst = Burst.current_burst(current_user)
    last_completed_burst = Burst.last_completed_burst(current_user)
    if current_burst.draft?
      render json: {
        burst: current_burst.as_json(include: :tasks),
        tasks: Task.for_current_burst(current_user),
        last_completed_burst: last_completed_burst
      }.to_json
      return
    end

    render json: {
      burst: current_burst.as_json(include: { bursts_tasks: { include: :task } })
    }.to_json
  end

  def start
    Burst.start_current_burst(current_user)

    render json: { status: 'ok' }
  end

  def add
    Burst.create_and_add_task_to_burst(params[:description], current_user)

    render json: { status: 'ok' }
  end

  def add_task
    Burst.add_task_to_burst(params[:id], current_user)

    render json: { status: 'ok' }
  end

  def remove
    Burst.remove_task_from_burst(params[:id], current_user)

    render json: { status: 'ok' }
  end

  def trash
    task = Task.where(user: current_user, id: params[:id]).first
    task&.trashed!
    render json: { status: 'ok' }
  end

  def complete_task
    Burst.complete_task(params[:id], current_user)

    render json: { status: 'ok' }
  end

  def complete
    Burst.complete_current_burst(current_user)

    render json: { status: 'ok' }
  end
end
