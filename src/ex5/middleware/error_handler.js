function errorHandler(err, req, res, next) {
    console.log("Received error", err.message, err.stack);
    if (res.headersSent) {
        return next(err);
    }
    const status = err.statusCode || 500;
    res.status(status);
    res.send(JSON.stringify({"status": status,
    "error": `${err.message || "Something went wrong"}`}));
};

module.exports = errorHandler;