# frozen_string_literal: true

class Burst < ApplicationRecord
  enum status: %i[draft active completed]

  belongs_to :user
  has_many :tasks

  def self.current_burst(current_user)
    active_burst = active.where(user: current_user).first
    return active_burst if active_burst.present?

    # draft.where(user: current_user).first_or_create
  end

  def self.start_current_burst(current_user)
    draft_burst = draft.where(user: current_user).first
    return unless draft_burst

    draft_burst.started_at = Time.now
    draft_burst.save!
    draft_burst.active!
  end

  def self.complete_current_burst(current_user)
    active_burst = active.where(user: current_user).first
    return unless active_burst

    active_burst.completed_at = Time.now
    active_burst.save!
    active_burst.completed!
  end

  def self.create_and_add_task_to_burst(description, current_user)
    draft_burst = draft.where(user: current_user).first
    return unless draft_burst

    task = Task.create(description: description, user: current_user)
    BurstsTasks.create(task: task, burst: draft_burst)
  end

  def self.add_task_to_burst(task_id, current_user)
    draft_burst = draft.where(user: current_user).first
    task = Task.find(task_id)
    return unless draft_burst && task

    BurstsTasks.create(task: task, burst: draft_burst)
  end

  def self.remove_task_from_burst(task_id, current_user)
    draft_burst = draft.where(user: current_user).first
    task = Task.find(task_id)
    return unless draft_burst && task

    BurstsTasks.where(task: task, burst: draft_burst).destroy_all
  end

  def self.complete_task(task_id, current_user)
    active_burst = active.where(user: current_user).first
    task = Task.find(task_id)
    burst_task = BurstsTasks.where(task: task, burst: active_burst).first

    return unless burst_task

    burst_task.completed = true
    burst_task.save!
  end

  def self.last_completed_burst(current_user)
    completed.where(user: current_user).order(completed_at: :desc).first
  end
end
