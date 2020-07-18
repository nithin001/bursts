class DropUserFromWorks < ActiveRecord::Migration[6.0]
  def change
    remove_column :works, :user_id, :integer
  end
end
