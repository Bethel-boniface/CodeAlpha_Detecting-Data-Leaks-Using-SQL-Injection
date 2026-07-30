const pool = require("../config/db");

class UserModel {

    static async findByEmail(email, client = pool) {

        const result = await client.query(

            `SELECT *
             FROM users
             WHERE email = $1`,

            [email]

        );

        return result.rows[0];

    }

    static async findById(id, client = pool) {

        const result = await client.query(

            `SELECT
                id,
                username,
                email,
                role,
                created_at
             FROM users
             WHERE id = $1`,

            [id]

        );

        return result.rows[0];

    }

    static async create(user, client = pool) {

        const result = await client.query(

            `INSERT INTO users
            (
                username,
                email,
                password_hash,
                role
            )

            VALUES

            ($1,$2,$3,$4)

            RETURNING
                id,
                username,
                email,
                role,
                created_at`,

            [

                user.username,

                user.email,

                user.password_hash,

                user.role

            ]

        );

        return result.rows[0];

    }

}

module.exports = UserModel;