module System
  class AppointmentsController < SystemController
    def index
    end

    def show
    end

    def new
    end

    def create
    end

    def edit
    end

    def update
    end

    def destroy
    end

    private

    def not_authorized
      redirect_to(:system_appointments)
    end
  end
end
