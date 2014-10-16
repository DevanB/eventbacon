class Registrant < ActiveRecord::Base
  belongs_to :group
  belongs_to :cost_level
end
