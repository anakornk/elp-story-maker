class PagesController < ApplicationController
  def home
  end


  def index
    @story = Story.find(params[:story_id])
    @pages = @story.pages
    @page = Page.new
    respond_to do |format|
      format.html { render :index }
      format.json { render plain: "@pages.to_json" }
    end
  end

  # TODO: ajax
  def create

    # security issue check here?
    @story = Story.find(params[:story_id])
    @page = Page.new(create_page_params)
    @page.story = @story
    authorize @page
    if @page.save
      links = create_links_params[:links_to_attributes]
      # if links
      links.each do |link_param|
        link_param[:src_page_id] = @page.id
        Link.create(link_param)
      # end
      end
      #redirect_to story_path(@story)
      render json: {status: "success"}
    else
      render json: {status:"fail"}
    end
  end

  # TODO: change to ajax
  def update
    # TODO:
    # check if page belongs to story
    @story = Story.find(params[:story_id])
    @page = Page.find(params[:id])

    authorize @page
    @page.update(update_page_params)
    if @page.save
      #redirect_to story_path(@story)
      render json: {status:"succeed"}.to_json
    else
      render json: {status:"fail"}.to_json
    end
  end

  def destroy
    @page = Page.find(params[:id])
    authorize @page
    if @page.destroy
      render json: {status: "success"}
    else
      render json: {status: "fail"}
    end
  end

  def show
    # TODO:
    # check if page belongs to story

    # NOUSE
    authorize Page.find(params[:id])

    json = Page.get_json_with_links(params[:id])
    #edit line 55
    render json: json
  end

  private

  def create_page_params
    params.require(:page).permit(:label, :content,:question,:x,:y,:image_video)
  end

  def create_links_params
    params.require(:page).permit(links_to_attributes: [:id, :choice_index, :choice_text])
  end

  def update_page_params
    params.require(:page).permit(:label,:content,:question,:x,:y,:image_video,links_to_attributes: [:id, :choice_text, :dst_page_id])
  end

  def page_params
    params.require(:page).permit(:label, :content, :image_video)
  end


end
