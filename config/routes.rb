Rails.application.routes.draw do
  root to: 'application#index'

  # resources :system, only: :index
  get '/system' => redirect('/system/patients')

  namespace :system do
    resources :appointments,
              :patients

    resources :users,         except: :show
    resources :dashboard,     only: :index
    get       '/user/edit',   to: 'user#edit'
    put       '/user/update', to: 'user#update'
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
