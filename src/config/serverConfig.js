require("dotenv").config();

module.exports = {
    PORT : process.env.PORT,
    FLIGHT_SERVICE_PATH : process.env.FLIGHT_SERVICE_PATH,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    QUEUE_NAME: process.env.QUEUE_NAME,
}