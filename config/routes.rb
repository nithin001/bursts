# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'
  resources :bursts
  get 'welcome/index'
  devise_for :users
  authenticated do
    get 'current', to: 'home#current', defaults: { format: :json }
    post 'start', to: 'home#start', defaults: { format: :json }
    post 'add', to: 'home#add', defaults: { format: :json }
    post 'remove', to: 'home#remove', defaults: { format: :json }
    post 'add_task', to: 'home#add_task', defaults: { format: :json }
    post 'trash', to: 'home#trash', defaults: { format: :json }
    post 'complete_task', to: 'home#complete_task', defaults: { format: :json }
    post 'complete', to: 'home#complete', defaults: { format: :json }
    root to: 'home#index', as: :authenticated_root
  end

  root to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
