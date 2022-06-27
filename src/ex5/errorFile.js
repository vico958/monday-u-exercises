function createHttpError(message, statusCode) {
    const newError = Error(message);
    newError.statusCode = statusCode;
    return newError
}

module.exports = createHttpError;