class S3::Patients::PictureCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id

    patient = Patient.where(id: id).first
    path = "patients/pictures/#{id}"

    return false if !patient.blank? && patient.picture == Image.get_url(path)

    Image.delete(path)

    true
  end
end
