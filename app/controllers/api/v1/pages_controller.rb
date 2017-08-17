class Api::V1::PagesController < Api::V1::BaseController
  def show
    @page = Page.find(params[:id])
    authorize @page
  end
end
