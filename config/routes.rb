# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'

  get 'welcome/index'
  devise_for :users
  authenticated do
    root to: 'home#index', as: :authenticated_root
    get 'tasks', to: 'home#tasks'
    get 'reports', to: 'home#reports'
    get 'sessions/*path', to: 'home#sessions'
    get 'add-post-dated-session', to: 'home#sessions'

    namespace :api do
      resources :bursts do
        member do
          patch :start
          patch :complete
          patch :notified
        end

        collection do
          get :active_dates
          post :create_post_dated_burst
        end
      end

      resources :works, only: %i[index create destroy] do
        member do
          patch :worked
          patch :undo_worked
        end
      end

      resources :tasks do
        member do
          patch :complete
          patch :undo_complete
        end
      end

      get 'burst', to: 'home#burst', defaults: { format: :json }
      get 'user', to: 'home#user', defaults: { format: :json }
      get 'tasks', to: 'home#tasks', defaults: { format: :json }
      get 'stats', to: 'home#stats', defaults: { format: :json }
      get 'feed', to: 'home#feed', defaults: { format: :json }
    end
  end

  root to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
