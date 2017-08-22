class Api::V1::WechatusersController < ActionController::Base
  def index
    render json: {asdf:"asdf"}
  end

  def login
    url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx094f96aadd6223d2&secret=75a01cae202bff4c8c8454e266da28a6&js_code=#{params[:code]}&grant_type=authorization_code"
    response = open(url).read
    json = JSON.parse(response)
    if json["errcode"]
      #error
      render json: {error: json["errmsg"]}

    else
      token = Devise.friendly_token(length = 40)

      @user = Wechatuser.find_by(openid: json["openid"])
      if @user
        @user.update(session_key: json["session_key"], third_session: token)
      else
        @user = Wechatuser.create(openid: json["openid"], session_key: json["session_key"], third_session: token)
      end
      render json: {third_session: token}

    end
  end

end
