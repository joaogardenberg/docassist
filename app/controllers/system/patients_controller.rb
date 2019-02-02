module System
  class PatientsController < SystemController
    respond_to    :html
    before_action :load_params,                       only: :index
    before_action :load_patient,                      only: [:show, :edit, :update, :destroy]
    before_action :verify_authorization,              only: [:index, :new, :create]
    before_action :verify_authorization_with_patient, only: [:show, :edit, :update, :destroy]
    before_action :load_doctors,                      only: [:new, :edit]

    def index
      @patients = current_user.patients
      @patients = @patients.where('name' => /.*#{@search}.*/i) if @search.present?
      @patients = @patients.order(@order[:field] => @order[:direction])
      @patients = @patients.page(@page)
    end

    def new
      @patient = Patient.new
      S3PatientCleanerWorker.perform_in(1.day, id: @patient.id.to_s)
    end

    def create
      @patient = Patient.new(permitted_attributes)

      if @patient.valid?
        @patient.save && render(status: :ok, json: { success: true })
      else
        render(status: :ok, json: { success: false, errors: @patient.errors })
      end
    end

    def update
      @patient.assign_attributes(permitted_attributes)

      if @patient.valid?
        @patient.save && render(status: :ok, json: { success: true })
      else
        render(status: :ok, json: { success: false, errors: @patient.errors })
      end
    end

    def destroy
      delete_image
      @patient.delete
      redirect_to(:system_patients)
    end

    def upload_picture
      url = ::Image.upload("patients/pictures/#{permitted_params[:id]}", permitted_params[:file].tempfile)
      render json: { url: url }
    end

    private

    def permitted_attributes
      ret = params.permit(
        :name, :gender, :marital_status,
        :date_of_birth, :occupation, :cpf,
        :rg, :rg_issuing_agency, :nationality,
        :nationality_other, :place_of_birth, :place_of_birth_other,
        :picture, :landline, :cell_phone,
        :work_phone, :email, :cep,
        :state, :city, :neighborhood,
        :address, :complement
      ).merge(
        user_id: current_user.doctor? ? current_user.id : BSON::ObjectId(params[:user_id]),
        current_user: current_user
      )

      ret[:_id] = BSON::ObjectId(params[:oauth_token]) if params[:oauth_token].present?

      ret
    end

    def permitted_params
      params.permit(:id, :search, :order, :page, :file)
    end

    def load_params
      @search = @search || search
      @order  = @order || order
      @page   = @page || page
    end

    def load_patient
      @patient = Patient.where(id: permitted_params[:id]).first
      redirect_to(:system_patients) unless @patient
    end

    def load_doctors
      @doctors = current_user.doctor? ? [] : current_user.doctors
    end

    def verify_authorization
      authorize(:patient)
    end

    def verify_authorization_with_patient
      authorize(@patient)
    end

    def search
      permitted_params[:search]
    end

    def order
      param = permitted_params[:order]

      if param.present? && param.include?('-')
        field, direction = param.split('-')

        return {
          field: field.to_sym,
          direction: direction.to_sym
        } if Patient.fields.pluck(0).include?(field) &&
             ['asc', 'desc'].include?(direction)
      end

      return {
        field: :name,
        direction: :asc
      }
    end

    def page
      permitted_params[:page] || 1
    end

    def delete_image
      picture_path = "patients/pictures/#{@patient.id}"
      ::Image.delete(picture_path) if @patient.picture.present? && @patient.picture == ::Image.get_url(picture_path)
    end

    def not_authorized
      redirect_to(:system_patients)
    end
  end
end
