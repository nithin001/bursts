# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: %i[worked skipped]
  belongs_to :user
  belongs_to :burst

  def self.for_current_burst(current_user)
    current_draft = Burst.draft.where(user: current_user).first
    tasks_in_current_draft = current_draft.tasks.pluck(:id)

    active.where(user: current_user).where.not(id: tasks_in_current_draft).order(id: :desc)
  end
end
