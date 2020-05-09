class CreateWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :works do |t|
      t.belongs_to :burst
      t.belongs_to :task

      t.integer :status, default: 0
      t.belongs_to :user
    end
  end
end
