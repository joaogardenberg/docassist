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
    if user.doctor?
      user.id == record.doctor_id
    else
      user.type_of.include?(record.doctor_id)
    end
  end

  def edit?
    update?
  end

  def destroy?
    if user.doctor?
      user.id == record.doctor_id
    else
      user.type_of.include?(record.doctor_id)
    end
  end
end
