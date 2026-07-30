const SQLInjectionService = require("../services/sqlInjection.service");
const pool = require("../config/db");

async function logAttack(req, payload, signature) {

    try {

        await pool.query(

            `
            INSERT INTO security_events
            (
                ip_address,
                endpoint,
                method,
                payload,
                attack_type,
                severity,
                blocked
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
            `,

            [
                req.ip,
                req.originalUrl,
                req.method,
                payload,
                "SQL Injection",
                "Critical",
                true
            ]

        );

    } catch (error) {

        console.error("Failed to log security event:", error);

    }

}

module.exports = async (req, res, next) => {

    const values = [];

    if (req.body) {

        values.push(...Object.values(req.body));

    }

    if (req.query) {

        values.push(...Object.values(req.query));

    }

    if (req.params) {

        values.push(...Object.values(req.params));

    }

    for (const value of values) {

        const result = SQLInjectionService.detect(value);

        if (result.detected) {

            await logAttack(
                req,
                result.payload,
                result.signature
            );

            return res.status(403).json({

                success: false,

                message: "SQL Injection attempt detected."

            });

        }

    }

    next();

};