class Group < ActiveRecord::Base
  belongs_to :user
  belongs_to :event
  has_many :registrants
  has_many :payments
end
