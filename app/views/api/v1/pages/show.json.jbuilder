if @page.story.published
  json.extract! @page, :label, :content, :question, :image_video_url,:audio_url
  json.links @page.links_to.order('links.choice_index') do |link|
    json.extract! link, :choice_index, :choice_text,:dst_page_id
  end
else
  json.error "Story is not published"
end
