class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :bursts, -> { order(created_at: :desc) }
  has_many :tasks, through: :bursts

  validates_presence_of :name, :timezone
  validates :timezone, inclusion: { in: ActiveSupport::TimeZone.all.map(&:name), message: '%{value} is not valid' }, allow_blank: true
end
