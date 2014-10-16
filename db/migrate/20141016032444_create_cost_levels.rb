class CreateCostLevels < ActiveRecord::Migration
  def change
    create_table :cost_levels do |t|
      t.references :event, index: true
      t.decimal :cost, :precision => 2
      t.decimal :deposit, :precision => 2
      t.string :name

      t.timestamps
    end
  end
end
