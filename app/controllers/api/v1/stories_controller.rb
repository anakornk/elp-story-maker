class Api::V1::StoriesController < Api::V1::BaseController
  def index
    @user = Wechatuser.find_by(third_session: params[:third_session])
    stories = policy_scope(Story)
    if @user
      @stories = stories.where('published = true').order('LOWER(title) ASC') #.joins('LEFT OUTER JOIN likes on likes.story_id = stories.id').select('stories.*,likes.wechatuser_id as uid').where('wechatuser_id is null OR wechatuser_id = ?',@user.id).order('LOWER(title) ASC')
      @liked_stories = @user.liked_stories.order('LOWER(title) ASC')
      @liked_stories_id = @liked_stories.map { |x| x.id }
    else
      # check if not null therefore -1 -> returns liked -> does not allow like
      #@stories = policy_scope(Story).where('published = true').select('stories.*,-1 as uid').order('LOWER(title) ASC')
      render json: {error: "cannot find user"}
    end
    # Story.where('published = true').joins('LEFT OUTER JOIN likes on likes.story_id = stories.id').select('stories.*,likes.wechatuser_id as uid').where('wechatuser_id = ? or wechatuser_id is null',1)
  end

  def like

    # this whole chunk is optimizable with sql
    @story = Story.find(params[:id])
    authorize @story
    # @user = Wechatuser.find(params[:third_session])
    @user = Wechatuser.find_by(third_session: params[:third_session])
    if @user
      #@user.update(session_key: json["session_key"], third_session: token)
      json = {}
      like = Like.find_by(story:@story,wechatuser:@user)
      if like
        if like.destroy
          json[:liked] = false
        else
          json[:error] = "delete failed"
        end
      else
        json[:liked] = true
        Like.create(story:@story,wechatuser:@user)
      end
      json[:likes_count] = @story.likes.count
      # @story.update(likes_count: @story.likes_count+1)
      render json: json
    else
      render json: {error: "cannot find user with third session"}
    end
  end
end
