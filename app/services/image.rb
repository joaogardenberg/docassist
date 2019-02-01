class Image
  class << self
    def upload(path, file)
      return unless File.exist?(file)

      object = AWS_S3_BUCKET.object(final_path(path))
      File.open(file, 'rb') { |f| object.put(body: f, acl: 'public-read') }

      "https://s3.#{ENV['AWS_S3_REGION']}.amazonaws.com/#{object.bucket_name}/#{object.key}"
    end

    def delete(url)
      return unless url.include?('.amazonaws.com/')

      _, *path = url.split('.amazonaws.com/').last.split('/')
      path = path.join('/')
      AWS_S3_BUCKET.object(path).delete

      true
    end

    private

    def final_path(path)
      "#{path}.jpg"
    end
  end
end
