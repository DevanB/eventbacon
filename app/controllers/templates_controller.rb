class TemplatesController < ApplicationController
  def template
    render :template => 'template' + params[:path], :layout => nil
  end
end