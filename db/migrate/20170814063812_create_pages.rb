class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :label
      t.text :content
      t.string :question

      t.timestamps
    end
  end
end
