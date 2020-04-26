# frozen_string_literal: true

class BurstsTasks < ApplicationRecord
  belongs_to :task
  belongs_to :burst

end
