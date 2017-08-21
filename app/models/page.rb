class Page < ApplicationRecord
  mount_uploader :image_video, ImageVideoUploader
  mount_uploader :audio, AudioUploader

  belongs_to :story
  has_one :story_id2, foreign_key: "root_page_id", class_name: "Story", dependent: :nullify

  # TODO validations
  # delete links_to and links_from
  has_many :links_to, foreign_key: :src_page_id, class_name: "Link", dependent: :destroy
  has_many :links_from, foreign_key: :dst_page_id, class_name: "Link", dependent: :nullify
  has_many :children, through: :links_to, source: :child
  has_many :parents, through: :links_from, source: :parent

  # validates :audio, presence: true
  # validates :image_video, presence: true
  validates :content, presence: true

  accepts_nested_attributes_for :links_to
  # src page destoryed - links should be destroyed
  # dst page destroyed - dst_page_id should be set to null
  # can use before_destroy action

  def self.get_json_with_links(id)
    # return a hash
    result_hash = {}
    begin
      page = Page.find(id)
      story = page.story

      result_hash[:label] = page.label
      result_hash[:content] = page.content
      result_hash[:question] = page.question
      result_hash[:created_at] = page.created_at
      result_hash[:image_video_url] = page.image_video.url
      result_hash[:updated_at] = page.updated_at
      result_hash[:story_id] = page.story_id
      result_hash[:links] = page.links_to.order('links.id ASC').map do |link|
        {choice_index: link.choice_index, choice_text: link.choice_text, nextPageId: link.dst_page_id}
      end
    rescue ActiveRecord::RecordNotFound => e
      response = {status: "error", message: e}
    end

    result_hash.to_json
  end
end
