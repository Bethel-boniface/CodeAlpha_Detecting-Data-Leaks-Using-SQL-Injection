const logger = require("../config/logger");

module.exports = (err, req, res, next) => {

    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method
    });

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Internal Server Error"
                : err.message
    });

};