class Api::GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @groups = Group.all
    render json: @groups
  end
  
  def show
    @groups = Group.find(params[:id])
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
