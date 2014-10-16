class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.references :user, index: true
      t.references :event, index: true
      t.string :name

      t.timestamps
    end
  end
end
