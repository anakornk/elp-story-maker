class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
  end

  def index
    @story = Story.find(params[:story_id])
    @pages = @story.pages
    render plain: @pages.to_json
  end

  def create
    @story = Story.find(params[:story_id])
    @page = Page.new(page_params)
    @page.story = @story
    if @page.save
      render plain: @page.to_json
    else
      render plain: "error"
    end
  end

  def update
    # TODO:
    # check if page belongs to story

    @page = Page.find(params[:id])
    @page.update(page_params)
    if @page.save
      render plain: @page.to_json
    else
      render plain: "error"
    end
  end

  def destroy
    @page = Page.find(params[:id])
    if @page.destroy
      render plain: "success"
    else
      render plain: "fail"
    end
  end

  def show
    # TODO:
    # check if page belongs to story
    begin
      page = Page.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      page = nil
    end
    page
  end

  private

  def page_params
    params.require(:page).permit(:label,:content,:question)
  end

end
