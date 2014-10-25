class Group < ActiveRecord::Base
  belongs_to :user
  has_many :registrants
  has_many :payments
  has_many :participations
  has_many :events, through: :participations
end
