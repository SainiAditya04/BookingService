const express = require('express');
const router = express.Router();

// import controllers
const { BookingController } = require('../../controllers/index');
// const { createChannel } = require('../../utils/messageQueue.js');

// const channel = createChannel()
const bookingController = new BookingController();

// booking routes
router.post('/bookings', bookingController.create);
router.post('/publish', bookingController.sendMessageToQueue);

module.exports = router;