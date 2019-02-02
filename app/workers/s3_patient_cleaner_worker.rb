class S3PatientCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id && Patient.where(id: id).first.blank?

    picture_url = Image.get_url("patients/pictures/#{id}")

    Image.delete(id, picture_url)

    true
  end
end
