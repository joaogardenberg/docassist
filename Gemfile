# Main information
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.0'

# Back-end main gems
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bson_ext'
gem 'mongoid', '~> 7.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.2'
gem 'redis', '~> 4.0'
gem 'redis-objects', '~> 1.4'
gem 'sqlite3'

# Front-end main gems
gem 'coffee-rails', '~> 4.2'
gem 'jbuilder', '~> 2.5'
gem 'sass-rails', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'

# Security gems
gem 'devise', '~> 4.5'

# Misc gems
gem 'figaro', '~> 1.1'
gem 'font-awesome-sass'
gem 'jquery-rails'
gem 'materialize-sass', '~> 1.0.0'
gem 'react-rails'
gem 'webpacker'

# Development environment gems
group :development do
  # gem 'capistrano-rails'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

# Test environment gems
group :test do
  gem 'capybara', '>= 2.15'
  gem 'chromedriver-helper'
  gem 'selenium-webdriver'
end

# Development and test environment gems
group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

# Multi-platform gems
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
