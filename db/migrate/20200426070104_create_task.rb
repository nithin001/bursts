# frozen_string_literal: true

class CreateTask < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :description
      t.integer :user_id
      t.integer :status, default: 0
    end

    create_table :bursts_tasks do |t|
      t.belongs_to :task
      t.belongs_to :burst

      t.boolean :completed, default: false
    end
  end
end
