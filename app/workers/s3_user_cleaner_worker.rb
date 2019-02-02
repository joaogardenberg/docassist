class S3UserCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id && User.where(id: id).first.blank?

    Image.delete("users/pictures/#{id}")
    Image.delete("users/backgrounds/#{id}")

    true
  end
end
