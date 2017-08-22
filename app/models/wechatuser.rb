class Wechatuser < ApplicationRecord
  has_many :likes, dependent: :destroy
end
