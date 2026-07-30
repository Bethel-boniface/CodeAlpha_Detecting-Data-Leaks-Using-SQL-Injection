const pool = require("../config/db");

class AuditModel {

    static async log(data, client = pool) {

        await client.query(

            `INSERT INTO audit_logs
            (
                user_id,
                action,
                description
            )

            VALUES

            ($1,$2,$3)`,

            [

                data.userId,

                data.action,

                data.description

            ]

        );

    }

}

module.exports = AuditModel;