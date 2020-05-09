class AddTimestampsToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :created_at, :timestamp
  end
end
