# frozen_string_literal: true

class Burst < ApplicationRecord
  enum status: %i[draft active completed notified]

  belongs_to :user
  has_many :tasks

  validates_presence_of :tasks, if: -> { active? }
  scope :finished, -> { where(status: %i[completed notified]) }

  def time_taken
    (completed_at - started_at).round
  end

  def completed_day
    completed_at.to_date
  end

  def humanized_time_taken
    return unless finished?

    ChronicDuration.output(time_taken, units: 1, limit_to_hours: true)
  end

  def humanized_from_to
    return unless finished?

    "#{started_at.strftime('%I:%M%p')} - #{completed_at.strftime('%I:%M%p')}"
  end

  def finished?
    completed? || notified?
  end
end
