Rails.application.routes.draw do
  root to: 'application#index'

  # resources :system, only: :index
  get '/system' => redirect('/system/patients')

  namespace :system do
    resources :dashboard, only: :index
    resources :appointments
    resources :patients
    resources :users
    get '/user/edit' => 'user#edit'
  end

  devise_for :users,
             path_names: {
               sign_in: 'login',
               sign_out: 'logout'
             },
             controllers: {
               registrations: 'registrations'
             }
end
