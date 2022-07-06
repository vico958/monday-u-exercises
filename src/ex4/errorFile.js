export default function createError(message, code) {
    const newError = Error(message);
    newError.statusCode = code;
    return newError
}