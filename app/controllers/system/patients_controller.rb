module System
  class PatientsController < SystemController
    respond_to    :html
    before_action :load_patient,     only: [:show, :edit, :update, :destroy]
    before_action :load_params,      only: :index

    def index
      @patients = Patient
      @patients = @patients.where('name' => /.*#{@search}.*/i) if @search.present?
      @patients = @patients.order(@order[:field] => @order[:direction])
      @patients = @patients.page(@page)
    end

    def new
      @patient = Patient.new
    end

    def create
      @patient = Patient.new(permitted_attributes)

      if @patient.valid?
        @patient.save && redirect_to(:system_patients)
      else
        render(action: :new)
      end
    end

    def update
      @patient.assign_attributes(permitted_attributes)

      if @patient.valid?
        @patient.save && redirect_to(:system_patients)
      else
        render(action: :edit)
      end
    end

    def destroy
      @patient.delete
      redirect_to(:system_patients)
    end

    private

    def permitted_attributes
      params.permit(
        :name, :gender, :marital_status,
        :date_of_birth, :occupation, :cpf,
        :rg, :rg_issuing_agency, :nationality,
        :nationality_other, :place_of_birth, :place_of_birth_other,
        :landline, :cell_phone, :work_phone,
        :email, :cep, :state,
        :city, :neighborhood, :address,
        :complement
      )
    end

    def permitted_params
      params.permit(:id, :search, :order, :page)
    end

    def load_patient
      @patient = Patient.where(id: permitted_params[:id]).first
      redirect_to(:system_patients) unless @patient
    end

    def load_params
      @search = @search || search
      @order  = @order || order
      @page   = @page || page
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
  end
end
