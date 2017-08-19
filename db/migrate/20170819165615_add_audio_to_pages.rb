class AddAudioToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :audio, :string
  end
end
