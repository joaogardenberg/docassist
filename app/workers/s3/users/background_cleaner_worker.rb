class S3::Users::BackgroundCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id

    user = User.where(id: id).first
    path = "users/backgrounds/#{id}"

    return false if !user.blank? && user.background == Image.get_url(path)

    Image.delete(path)

    true
  end
end
