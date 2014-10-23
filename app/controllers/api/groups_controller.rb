class Api::GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @groups = Group.all
    render json: @groups
  end
  
  def show
    @groups = Event.find(params[:id]).groups
    render json: @groups
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
