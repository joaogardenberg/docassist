Rails.application.routes.draw do
  root to: 'application#index'

  # resources :system, only: :index
  get '/system' => redirect('/system/dashboard')

  namespace :system do
    resources :appointments

    resources :dashboard, only: :index

    put       '/patients/upload_picture', to: 'patients#upload_picture'
    resources :patients

    put       '/users/upload_picture',    to: 'users#upload_picture'
    put       '/users/upload_background', to: 'users#upload_background'
    resources :users,                     except: :show

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
