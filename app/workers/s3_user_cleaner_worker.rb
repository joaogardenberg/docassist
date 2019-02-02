class S3UserCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id && User.where(id: id).first.blank?

    picture_url = Image.get_url("users/pictures/#{id}")
    background_url = Image.get_url("users/backgrounds/#{id}")

    Image.delete(id, picture_url)
    Image.delete(id, background_url)

    true
  end
end
