class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :registration_open_date, :start_date, :end_date, :max_registration_limit
end
