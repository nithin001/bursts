# frozen_string_literal: true

class Burst < ApplicationRecord
  enum status: %i[draft active completed]

  belongs_to :user
  has_many :works
  has_many :tasks, through: :works

  validates_presence_of :works, if: -> { active? }
  default_scope { order('created_at DESC') }
  scope :finished, -> { where(status: %i[completed]) }
  scope :unfinished, -> { where(status: %i[active draft]) }

  scope :on_date, ->(date) { between(date.in_time_zone.beginning_of_day, date.in_time_zone.end_of_day) }
  scope :between, ->(from_time, to_time) { where('completed_at BETWEEN ? AND ?', from_time, to_time) }

  def time_taken
    (completed_at - started_at).round
  end

  def completed_day
    completed_at.try(&:to_date)
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
    completed?
  end

  def humanized_completed_at
    return unless finished?

    completed_at.strftime('%Y-%m-%d').to_s
  end
end
