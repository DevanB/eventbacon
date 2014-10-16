class CreateRegistrants < ActiveRecord::Migration
  def change
    create_table :registrants do |t|
      t.references :group, index: true
      t.references :cost_level, index: true
      t.string :name

      t.timestamps
    end
  end
end
