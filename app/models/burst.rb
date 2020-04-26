# frozen_string_literal: true

class Burst < ApplicationRecord
  enum status: %i[draft active completed]

  belongs_to :user

  def self.current_burst(current_user)
    active_burst = active.where(user: current_user).first
    return active_burst if active_burst.present?

    draft.where(user: current_user).first_or_create
  end
end
