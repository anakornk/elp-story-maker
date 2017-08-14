class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.string :title
      t.integer :root_page_id
      t.string :category

      t.timestamps
    end
  end
end
