json.array! @stories do |story|
  json.extract! story, :id, :title, :root_page_id,:category
end
