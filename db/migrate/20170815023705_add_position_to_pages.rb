class AddPositionToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :x, :integer
    add_column :pages, :y, :integer
  end
end
