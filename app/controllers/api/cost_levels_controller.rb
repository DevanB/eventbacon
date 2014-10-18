class CostLevelsController < ApplicationController
  def index
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def cost_level_params
    params.require(:cost_level).permit(:cost, :deposit, :name)
  end
end
