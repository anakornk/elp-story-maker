class Wechatuser < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_many :liked_stories, through: :likes, source: :story
end
