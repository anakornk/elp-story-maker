class AddLikesToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :likes_count, :integer, null: false, default: 0
  end
end
