class ApartmentsController < ApplicationController
    def index
        apartments = Apartment.all
        render json: apartments
    end
    
    def create
        apartment = Apartment.create apartment_params
        render json: apartment
    end
    
    private
    def apartment_params
        params.require(:apartment).allow(:street, :city)
    end
end
