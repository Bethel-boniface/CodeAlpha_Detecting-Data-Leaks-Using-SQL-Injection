const pool = require("../config/db");

class SecurityEventModel {

    static async create(event, client = pool) {

        const result = await client.query(

            `
            INSERT INTO security_events
            (
                ip_address,
                endpoint,
                method,
                payload,
                attack_type,
                category,
                severity,
                risk_score,
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
                $7,
                $8,
                $9
            )
            RETURNING *
            `,

            [

                event.ipAddress,

                event.endpoint,

                event.method,

                event.payload,

                event.attackType,

                event.category,

                event.severity,

                event.riskScore,

                event.blocked ?? true

            ]

        );

        return result.rows[0];

    }

}

module.exports = SecurityEventModel;