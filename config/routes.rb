Rails.application.routes.draw do
  devise_for :users
  get "stories", to: "stories#index" #list out all stories
  get "stories/:id", to: "stories#show", as: :story # story maker page
  delete "stories/:id", to: "stories#destroy" #delete a page
  put "stories/:id", to: "stories#update" #update story (name,publish status)
  post "stories", to: "stories#create" #create blank story

  # get 'pages/stories/:story_id/pages', to: 'pages#home'
  root to: 'stories#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 get "stories/:story_id/pages", to: "pages#index", as: :story_pages#list out all pages of the story
 post 'stories/:story_id/pages', to: "pages#create" #create new page
 put 'stories/:story_id/pages/:id', to: "pages#update" #update the page
 delete 'stories/:story_id/pages/:id', to: "pages#destroy"
 get 'stories/:story_id/pages/:id', to: "pages#show", as: :story_page #show one page info, contains left right Node Info

  # special for miniprogram
  # get "stories/:id/root_page", to: "stories#root_page" # story maker page

  # resources :stories do
  #   resources :pages, except: [:new, :edit], shallow: true
  # end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "wechatusers/",to: "wechatusers#index"
      get "wechatusers/login",to: "wechatusers#login"
      resources :stories, only: [ :index ] do
        resources :pages, only: [ :show ]
      end
      post "stories/:id/like",to: "stories#like"

    end
  end

end
