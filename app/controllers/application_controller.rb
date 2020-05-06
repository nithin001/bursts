# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  around_action :set_timezone, if: :current_user

  protected

  def configure_permitted_parameters
    added_attrs = %i[email name password password_confirmation remember_me timezone]
    lockdown = %i[password name password_confirmation remember_me timezone]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: lockdown
    devise_parameter_sanitizer.permit :accept_invitation, keys: lockdown
  end

  private

  def set_timezone(&block)
    Time.use_zone(current_user.timezone, &block)
  end
end
