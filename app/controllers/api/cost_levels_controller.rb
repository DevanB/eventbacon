class Api::CostLevelsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @cost_levels = CostLevel.find(event_id: params[:id])
    render json: @cost_levels
  end

  def create
    @cost_level = CostLevel.new(cost_level_params)
    if @cost_level.save
      render json: @cost_level
    else
      render json: @cost_level.errors, status: 400
    end
  end

  def show
    @cost_level = CostLevel.find(params[:id])
    render json: @cost_level
  end

  def update
  end

  def destroy
  end

  private

  def cost_level_params
    params.require(:cost_level).permit(:event_id, :cost, :deposit, :name)
  end
end
