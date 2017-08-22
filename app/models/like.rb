class Like < ApplicationRecord
  belongs_to :story
  belongs_to :wechatuser
  validates_uniqueness_of :story, :scope => [:wechatuser]
end

