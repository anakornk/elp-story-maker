class AddImageToStories < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :image, :string
  end
end
