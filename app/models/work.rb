# frozen_string_literal: true

class Work < ApplicationRecord
  enum status: %i[skipped worked]
  belongs_to :task
  belongs_to :burst
end
