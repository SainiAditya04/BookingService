require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const startServer = () => {
    app.use(express.json());
    app.use("/api", apiRoutes);

    app.listen(PORT, (req, res) => {
        console.log(`Server is started at PORT ${PORT}`);
        
        if(process.env.DB_SYNC){
            db.sequelize.sync({ alter: true });
        }
    });
}

startServer();