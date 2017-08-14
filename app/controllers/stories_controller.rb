class StoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @stories = Story.all
  end

  def show
    @story = Story.find(params[:id])

  end

  def destroy
    @story = Story.find(params[:id])
    if @story.destroy
      render plain: "success"
    else
      render plain: "fail"
    end
  end

  def update
    # publish or update story info
    @story = Story.find(params[:id])
    @story.update(story_params)
  end

  def create
    @story = Story.create(story_params)
    render plain: @story.to_json
  end

  private

  def story_params
    params.require(:story).permit(:title,:root_page_id,:category)
  end
end
