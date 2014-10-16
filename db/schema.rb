# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141016032717) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cost_levels", force: true do |t|
    t.integer  "event_id"
    t.decimal  "cost",       precision: 2, scale: 0
    t.decimal  "deposit",    precision: 2, scale: 0
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cost_levels", ["event_id"], name: "index_cost_levels_on_event_id", using: :btree

  create_table "events", force: true do |t|
    t.string   "name"
    t.datetime "registration_open_date"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer  "max_registration_limit"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", force: true do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups", ["event_id"], name: "index_groups_on_event_id", using: :btree
  add_index "groups", ["user_id"], name: "index_groups_on_user_id", using: :btree

  create_table "payments", force: true do |t|
    t.integer  "group_id"
    t.decimal  "amount",     precision: 2, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "payments", ["group_id"], name: "index_payments_on_group_id", using: :btree

  create_table "registrants", force: true do |t|
    t.integer  "group_id"
    t.integer  "cost_level_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "registrants", ["cost_level_id"], name: "index_registrants_on_cost_level_id", using: :btree
  add_index "registrants", ["group_id"], name: "index_registrants_on_group_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "role"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
