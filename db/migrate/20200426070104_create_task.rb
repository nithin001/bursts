# frozen_string_literal: true

class CreateTask < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :description
      t.belongs_to :user
      t.belongs_to :burst

      t.integer :status, default: 0
    end
  end
end
