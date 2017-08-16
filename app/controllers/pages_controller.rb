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

    # security issue check here?
    @story = Story.find(params[:story_id])
    @page = Page.new(create_page_params)
    @page.story = @story
    if @page.save
      create_links_params[:links_to_attributes].each do |link_param|
        link_param[:src_page_id] = @page.id
        Link.create(link_param)
      end
      redirect_to story_path(@story)
      # render plain: @page.to_json
    else
      render plain: "error"
    end
  end

  def update
    # TODO:
    # check if page belongs to story

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
    params.require(:page).permit(:label,:content,:question,:x,:y)
  end

  def create_links_params
    params.require(:page).permit(links_to_attributes: [:id, :choice_index, :choice_text])
  end

  def update_page_params
    params.require(:page).permit(:label,:content,:question,:x,:y,links_to_attributes: [:id, :choice_text, :dst_page_id])
  end



end
