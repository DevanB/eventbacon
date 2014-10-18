class GroupsController < ApplicationController
  def index
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
end
