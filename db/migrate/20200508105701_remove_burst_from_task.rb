# frozen_string_literal: true

class RemoveBurstFromTask < ActiveRecord::Migration[6.0]
  def change
    remove_column :tasks, :burst_id, :integer
  end
end
