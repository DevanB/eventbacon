class Event < ActiveRecord::Base
  has_many :participations
  has_many :groups, through: :participations
  has_many :cost_levels
  scope :active, -> { where("end_date > ?", Date.today )}

  accepts_nested_attributes_for :cost_levels

  def cost_levels_attributes=(cost_levels)
    self.cost_levels.each(&:destroy)
    super(cost_levels)
  end
end