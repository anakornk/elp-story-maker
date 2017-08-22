json.array! @stories do |story|
  json.extract! story, :id, :title, :root_page_id,:category,:image_url,:likes_count
end
