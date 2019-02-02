class Image
  class << self
    def upload(path, file)
      return unless File.exist?(file)

      object = AWS_S3_BUCKET.object(final_path(path))
      File.open(file, 'rb') { |f| object.put(body: f, acl: 'public-read') }

      "https://s3.#{ENV['AWS_S3_REGION']}.amazonaws.com/#{object.bucket_name}/#{object.key}"
    end

    def delete(path)
      AWS_S3_BUCKET.object(final_path(path)).delete

      true
    end

    def get_url(path)
      "https://s3.#{ENV['AWS_S3_REGION']}.amazonaws.com/#{ENV['AWS_S3_BUCKET']}/#{final_path(path)}"
    end

    def types
      ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp']
    end

    private

    def final_path(path)
      "#{path}.jpg"
    end
  end
end
