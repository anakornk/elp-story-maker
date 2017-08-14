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
    @page = Page.new(create_page_params)
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
    # render json: params
    # return
    @page = Page.find(params[:id])
    @page.update(update_page_params)
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

    #edit line 55

    render json: Page.get_json_with_links(params[:id])
  end

  private

  def create_page_params
    params.require(:page).permit(:label,:content,:question,links_to_attributes: [:id, :choice_index, :choice_text, :src_page_id, :dst_page_id])
  end

  def update_page_params
    params.require(:page).permit(:label,:content,:question,links_to_attributes: [:id, :choice_text, :dst_page_id])
  end



end
