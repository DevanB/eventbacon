class Api::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Event.all
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: @event.errors, status: 400
    end
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def update
    @event = Event.find(params[:id])

    if @event.update_attributes(event_params)
      render json: @event
    else
      render json: @event.errors, status: 400
    end
  end

  def destroy
  end

  private

  def event_params
    params.require(:event).permit(:name, :registration_open_date, :start_date, :end_date, :max_registration_limit, cost_levels_attributes: [:name, :cost, :deposit])
  end
end
