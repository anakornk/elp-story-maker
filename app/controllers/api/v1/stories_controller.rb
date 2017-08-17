class Api::V1::StoriesController < Api::V1::BaseController
  def index
    @stories = policy_scope(Story)
  end
end
