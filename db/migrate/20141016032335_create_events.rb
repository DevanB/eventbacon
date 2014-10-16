class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :registration_open_date
      t.datetime :start_date
      t.datetime :end_date
      t.integer :max_registration_limit

      t.timestamps
    end
  end
end
