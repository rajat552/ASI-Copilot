/**
 * Centralized response and error utility functions
 */

const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json(data);
};

const errorResponse = (res, message, errorCode = 500) => {
    return res.status(errorCode).json({
        error: message,
        status: 'fail'
    });
};

module.exports = {
    successResponse,
    errorResponse
};
