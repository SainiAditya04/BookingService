const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();


class BookingController {
    constructor(){

    }

    async sendMessageToQueue(req, res){
        try {
            const channel = await createChannel();
            const payload = {
                data: {
                    subject: 'This is notification from queue',
                    content: 'some queue will subscribe to this',
                    recepientEmail: 'mail2adityasaini@gmail.com',
                    notificationTime: '2024-07-20T10:49:00'
                },
                service: 'CREATE_TICKET'
            }
            publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
            return res.status(200).json({
                message: "successfully send message to the queue",
                success: true,
            })
        } catch (error) {
            console.log("Something went wrong in booking controller ");
            throw error;
        }
    }

    async create(req, res) {
        try {
            const booking = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message: "successfully created the booking",
                success: true,
                data: booking,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
                success: false,
                err: error.explaination
            });
        }
    }
}

module.exports = BookingController;