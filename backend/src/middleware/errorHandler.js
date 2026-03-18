const { errorResponse } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
    console.error(`❌ [Error]: ${err.message}`);
    if (err.stack) console.debug(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;
