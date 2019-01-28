class PatientPolicy < SystemPolicy
  def index?
    true
  end

  def show?
    if user.doctor?
      user.id == record.doctor_id
    else
      user.type_of.include?(record.doctor_id)
    end
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user.id == record.doctor_id
  end

  def edit?
    update?
  end

  def destroy?
    user.id == record.doctor_id
  end
end
