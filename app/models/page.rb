class Page < ApplicationRecord
  belongs_to :story
  has_many :links_to, foreign_key: :src_page_id, class_name: "Link"
  has_many :links_from, foreign_key: :dst_page_id, class_name: "Link"
  has_many :children, through: :links_to, source: :child
  has_many :parents, through: :links_from, source: :parent

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
      result_hash[:updated_at] = page.updated_at
      result_hash[:story_id] = page.story_id
      result_hash[:links] = page.links_to.map do |link|
        {choice_index: link.choice_index, choice_text: link.choice_text, path: "/stories/#{story.id}/pages/#{link.dst_page_id}"}
      end
    rescue ActiveRecord::RecordNotFound => e
      response = {status: "error", message: e}
    end

    result_hash.to_json
  end
end
