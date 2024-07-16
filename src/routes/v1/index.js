const express = require('express');
const router = express.Router();

// import controllers
const { BookingController } = require('../../controllers/index');

// import middlewares

// booking routes
router.post('/bookings', BookingController.create);

module.exports = router;