const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const bookingService = new BookingService();

const create = async (req, res) => {
    try{
        const booking = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: "successfully created the booking",
            success: true,
            data: booking,
        });
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explaination
        });
    }
}

module.exports = {
    create,
}