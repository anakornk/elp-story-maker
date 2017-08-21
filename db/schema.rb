# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170819165615) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "links", force: :cascade do |t|
    t.integer "choice_index"
    t.string "choice_text"
    t.integer "src_page_id"
    t.integer "dst_page_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["choice_index", "src_page_id"], name: "index_links_on_choice_index_and_src_page_id", unique: true
  end

  create_table "pages", force: :cascade do |t|
    t.string "label"
    t.text "content"
    t.string "question"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "story_id"
    t.string "image"
    t.integer "x"
    t.integer "y"
    t.string "image_video"
    t.string "audio"
    t.index ["story_id"], name: "index_pages_on_story_id"
  end

  create_table "stories", force: :cascade do |t|
    t.string "title"
    t.integer "root_page_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "published", default: false, null: false
    t.string "image"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pages", "stories"
end
