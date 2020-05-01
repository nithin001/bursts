# frozen_string_literal: true

class Burst < ApplicationRecord
  enum status: %i[draft active completed]

  belongs_to :user
  has_many :tasks

  def time_taken
    (completed_at - started_at).round
  end
end
