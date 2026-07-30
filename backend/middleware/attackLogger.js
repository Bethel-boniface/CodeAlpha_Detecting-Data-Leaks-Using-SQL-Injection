const SecurityEvent = require("../models/securityEvent.model");

module.exports = async (req, detection) => {

    try {

        await SecurityEvent.create({

            ipAddress:
                req.ip ||
                req.socket?.remoteAddress ||
                "Unknown",

            endpoint:
                req.originalUrl,

            method:
                req.method,

            payload:
                detection.payload,

            attackType:
                detection.attackType,

            category:
                detection.category,

            severity:
                detection.severity,

            riskScore:
                detection.riskScore,

            blocked:
                true

        });

    } catch (error) {

        console.error(

            "Unable to log attack:",

            error.message

        );

    }

};