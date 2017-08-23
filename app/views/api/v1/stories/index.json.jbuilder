json.array! @stories do |story|
  json.extract! story, :id, :title, :root_page_id,:category,:image_url,:updated_at
  json.liked (story.uid != nil)
  json.likes_count story.likes.count #very slow
end
