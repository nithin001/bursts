# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || bursts_path
  end

  protected

  def configure_permitted_parameters
    added_attrs = %i[email name password password_confirmation remember_me]
    lockdown = %i[password name password_confirmation remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: lockdown
    devise_parameter_sanitizer.permit :accept_invitation, keys: lockdown
  end
end
