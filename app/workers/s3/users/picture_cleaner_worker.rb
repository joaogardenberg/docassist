class S3::Users::PictureCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id

    user = User.where(id: id).first
    path = "users/pictures/#{id}"

    return false if !user.blank? && user.picture == Image.get_url(path)

    Image.delete(path)

    true
  end
end
