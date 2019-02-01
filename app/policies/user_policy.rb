class UserPolicy < SystemPolicy
  def index?
    user.main?
  end

  def show?
    user.main? && user.id == record.main_user_id
  end

  def create?
    user.main?
  end

  def new?
    create?
  end

  def update?
    user.main? && user.id == record.main_user_id
  end

  def edit?
    update?
  end

  def destroy?
    user.main? && user.id == record.main_user_id && !record.main?
  end
end
