class TemplatesController < ApplicationController
  def index
  end
  
  def template
    render :template => 'template' + params[:path], :layout => nil
  end
end