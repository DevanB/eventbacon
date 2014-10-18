class Api::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Event.all
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    end
  end

  def update
  end

  def destroy
  end

  private

  def event_params
    params.require(:event).permit(:name, :registation_open_date, :start_date, :end_date, :max_registration_limit)
  end
end
