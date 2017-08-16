class AddImageToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :image, :string
  end
end
