class AddIndexToLinks < ActiveRecord::Migration[5.1]
  def change
    add_index :links, [:choice_index, :src_page_id], unique: true
  end
end
