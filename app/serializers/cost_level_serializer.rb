class CostLevelSerializer < ActiveModel::Serializer
  attributes :id, :event_id, :cost, :deposit, :name
end
