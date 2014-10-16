class CostLevel < ActiveRecord::Base
  belongs_to :event
  has_many :registrants
end
