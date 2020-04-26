class CreateBursts < ActiveRecord::Migration[6.0]
  def change
    create_table :bursts do |t|
      t.integer :status
      t.datetime :started_at
      t.datetime :completed_at
      t.integer :user_id

      t.timestamps
    end
  end
end
