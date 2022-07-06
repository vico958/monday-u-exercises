// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from 'express';
import cors from 'cors';
import itemRouter from './server/routes/api.js';
import bodyParser from 'body-parser';
import errorHandler from './middleware/error_handler.js';
import logger from './middleware/logger.js';
const port = 3030;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use([logger]);
// app.use('/static', express.static('public'));
app.use(itemRouter);
// process.on('unhandledRejection', (reason, promise) => {
//     console.log("Unhandled Rejection", reason.message);
//     throw reason;
// });

// process.on('uncaughtException', (error) => {
//     console.log("Uncaught Exception", error.message);
//     throw error;
// });

app.use(errorHandler);
app.listen(port, () => {
    console.log("Server started on port", port);
});