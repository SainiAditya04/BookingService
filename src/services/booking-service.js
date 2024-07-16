const { BookingRepository } = require('../repository/index');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try{
            const flightId = data.flightId;
            const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData =  response.data.data;
            let priceOfTheFlight = flightData.price;

            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    "Something went wrong in the booking process",
                    "Seats not available in the flight",
                );
            }

            // if there is payment involved, call the payment API now
            // first the payment must be done, if successful, then proceed further to booking

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };

            const booking = await this.bookingRepository.create(bookingPayload);

            // reduce the number of seats in the flight
            // and update the status to "Booked" from "InProgress"
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestUrl, {
                totalSeats: flightData.totalSeats - booking.noOfSeats
            });

            const finalBooking = await this.bookingRepository.update(booking.id, {
                status: "Booked"
            });

            return finalBooking;
        }
        catch(error){
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;