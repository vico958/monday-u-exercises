const express = require('express');
const bodyParser = require('body-parser');
const itemRouter = require('./server/routes/api');
const errorHandler = require('./middleware/error_handler');
const cors = require('cors');
const logger = require('./middleware/logger');
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
}
const port = 3030;
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use([logger]);
app.use(itemRouter);
app.use(errorHandler);
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
});
process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
});
app.listen(port, () => {
    console.log("Server started on port", port);
});