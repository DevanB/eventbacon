class CreateParticipationsTable < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.integer :event_id, null: false
      t.integer :group_id, null: false
    end
    Group.all.each do |group|
      Participation.create!(event_id: group.event_id, group_id: group.id)
    end
    remove_column :groups, :event_id
  end
end
