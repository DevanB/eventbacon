class Event < ActiveRecord::Base
  has_many :groups
  has_many :cost_levels
end
