class AddPublishToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :published, :boolean, null: false, default: false
  end
end
