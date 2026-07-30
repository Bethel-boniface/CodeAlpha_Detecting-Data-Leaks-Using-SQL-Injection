const rateLimit = require("express-rate-limit");

const security = require("../config/security");

const isDevelopment =
    process.env.NODE_ENV !== "production";

module.exports = rateLimit({

    // Disable rate limiting while developing
    skip: () => isDevelopment,

    windowMs:
        security.rateLimit.windowMs,

    max:
        security.rateLimit.maxRequests,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many requests."

    }

});