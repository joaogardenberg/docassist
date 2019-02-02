class S3PatientCleanerWorker
  include Sidekiq::Worker

  def perform(params)
    id = params['id']

    return false unless id && Patient.where(id: id).first.blank?

    Image.delete("patients/pictures/#{id}")

    true
  end
end
