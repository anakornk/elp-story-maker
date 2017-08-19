class AddImageVideoToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :image_video, :string
  end
end
