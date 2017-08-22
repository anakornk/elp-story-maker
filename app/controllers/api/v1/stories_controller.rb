class Api::V1::StoriesController < Api::V1::BaseController
  def index
    @stories = policy_scope(Story).where('published = true').order('LOWER(title) ASC')
  end

  def like
    @story = Story.find(params[:id])
    authorize @story
    # @user = Wechatuser.find(params[:third_session])
    @user = Wechatuser.find_by(third_session: params[:third_session])
    if @user
      #@user.update(session_key: json["session_key"], third_session: token)
      @story.update(likes_count: @story.likes_count+1)
      render json: @story
    else
      #@user = Wechatuser.create(openid: json["openid"], session_key: json["session_key"], third_session: token)
      render json: {error: "cannot find user with third session"}
    end
  end
end
