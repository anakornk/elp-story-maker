class AddStoryToPages < ActiveRecord::Migration[5.1]
  def change
    add_reference :pages, :story, foreign_key: true
  end
end
