json.extract! @page, :label, :content, :question, :image_url
json.links @page.links_to.order('links.choice_index') do |link|
  json.extract! link, :choice_index, :choice_text,:dst_page_id
end
