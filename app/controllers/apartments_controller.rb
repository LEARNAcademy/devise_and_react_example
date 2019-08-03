class ApartmentsController < ApplicationController
    before_action :authenticate_user!, only: [:create]
    
    def index
        apartments = Apartment.all
        render json: apartments
    end
    
    def create
        apartment = current_user.apartments.create apartment_params
        render json: apartment, status: 201
    end
    
    private
    def apartment_params
        params.require(:apartment).permit(:street, :city)
    end
end
