const detector = require("../services/sqlDetection.service");

const attackLogger = require("./attackLogger");

module.exports = async (req, res, next) => {

    try {

        const detection = detector.scan({

            body: req.body,

            query: req.query,

            params: req.params

        });

        if (!detection) {

            return next();

        }

        await attackLogger(

            req,

            detection

        );

        return res.status(403).json({

            success: false,

            message: "Potential malicious request detected.",

            category: detection.category,

            attack: detection.attackType,

            severity: detection.severity,

            riskScore: detection.riskScore,

            blocked: true

        });

    } catch (error) {

        console.error(

            "Threat detection failed:",

            error

        );

        return res.status(500).json({

            success: false,

            message: "Security engine failure."

        });

    }

};