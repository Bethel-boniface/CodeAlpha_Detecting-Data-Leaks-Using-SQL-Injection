const pool = require("../config/db");

class CapabilityModel {

    static async findByRole(role) {

        const result = await pool.query(

            `
            SELECT
                c.capability_code,
                c.description

            FROM capabilities c

            INNER JOIN role_capabilities rc

            ON c.id = rc.capability_id

            WHERE rc.role = $1
            `,

            [role]

        );

        return result.rows;

    }

    static async exists(code) {

        const result = await pool.query(

            `
            SELECT *

            FROM capabilities

            WHERE capability_code = $1
            `,

            [code]

        );

        return result.rows[0];

    }

}

module.exports = CapabilityModel;