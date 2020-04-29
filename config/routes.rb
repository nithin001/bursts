# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'
  resources :bursts do
    member do
      patch :start
      patch :complete
    end
    resources :tasks do
      member do
        patch :complete
        patch :undo_complete
      end
    end
  end

  get 'welcome/index'
  devise_for :users
  authenticated do
    get 'burst', to: 'home#burst', defaults: { format: :json }
    get 'user', to: 'home#user', defaults: { format: :json }
    get 'tasks', to: 'home#tasks', defaults: { format: :json }
    root to: 'home#index', as: :authenticated_root
  end

  root to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
