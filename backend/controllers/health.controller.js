const pool = require("../config/db");

exports.health = async (req, res, next) => {

    try {

        await pool.query("SELECT NOW()");

        res.json({

            success: true,

            application: "SQLShield",

            version: "1.0.0",

            database: "Connected",

            uptime: process.uptime(),

            timestamp: new Date().toISOString()

        });

    } catch (error) {

        next(error);

    }

};