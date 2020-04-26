# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'
  resources :bursts
  get 'welcome/index'
  devise_for :users
  authenticated do
    root to: 'home#index', as: :authenticated_root
  end

  root to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
