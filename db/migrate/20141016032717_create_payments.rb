class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :group, index: true
      t.decimal :amount, :precision => 2

      t.timestamps
    end
  end
end
