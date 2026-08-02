const pool = require("../config/db");

class CapabilityModel {

    static async findByRole(role) {

        console.log("Running query for role:", role);

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

        console.log("Rows returned:");
        console.log(result.rows);

        return result.rows;
    }

}

module.exports = CapabilityModel;