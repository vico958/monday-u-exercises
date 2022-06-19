// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from 'express';
import cors from 'cors';
import itemRouter from './server/routes/api.js';
import bodyParser from 'body-parser';
const port = 3030;
const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use('/static', express.static('public'));
app.use(itemRouter);
// app.use(errorHandler);
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});

app.listen(port, () => {
    console.log("Server started on port", port);
});