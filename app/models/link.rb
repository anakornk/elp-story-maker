class Link < ApplicationRecord
  belongs_to :parent, foreign_key: "src_page_id", class_name: "Page"
  belongs_to :child, foreign_key: "dst_page_id", class_name: "Page", optional: true
end
