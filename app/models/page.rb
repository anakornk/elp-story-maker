class Page < ApplicationRecord
  has_many :follower_follows, foreign_key: :src_page_id, class_name: "Link"
  has_many :followee_follows, foreign_key: :dst_page_id, class_name: "Link"
  has_many :childs, through: :follower_follows, source: :child
  has_many :parents, through: :followee_follows, source: :parent
end
