Rails.application.routes.draw do
  get "stories", to: "stories#index" #list out all stories
  get "stories/:id", to: "stories#show" # story maker page
  delete "stories/:id", to: "stories#destroy" #delete a page
  put "stories/:id", to: "stories#update" #update story (name,publish status)
  post "stories", to: "stories#create" #create blank story

  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "stories/:story_id/pages", to: "pages#index" #list out all pages of the story
  post 'stories/:story_id/pages', to: "pages#create" #create new page
  put 'stories/:story_id/pages/:id', to: "pages#update" #update the page
  delete 'stories/:story_id/pages/:id', to: "pages#destroy" #delete the page
  get 'stories/:story_id/pages/:id', to: "pages#show" #show one page info, contains left right Node Info
end
