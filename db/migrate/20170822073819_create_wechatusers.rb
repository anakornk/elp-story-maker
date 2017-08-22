class CreateWechatusers < ActiveRecord::Migration[5.1]
  def change
    create_table :wechatusers do |t|
      t.string :third_session
      t.string :session_key
      t.string :openid
      t.timestamps
    end
  end
end
