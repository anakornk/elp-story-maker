class CreateLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :links do |t|
      t.integer :choice_index
      t.string :choice_text
      t.integer :src_page_id
      t.integer :dst_page_id
      t.timestamps
    end
  end
end
