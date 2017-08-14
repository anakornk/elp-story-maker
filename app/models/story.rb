class Story < ApplicationRecord
  has_many :pages, dependent: :destroy
  def root_page
    begin
      root_page = Page.find(root_page_id)
    rescue ActiveRecord::RecordNotFound => e
      root_page = nil
    end
    root_page
  end
end
