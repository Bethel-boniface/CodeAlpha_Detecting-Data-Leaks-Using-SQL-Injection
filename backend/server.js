const path = require("path");

// Load .env from the project root
require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});

const app = require("./app");
const { PORT } = require("./config/env");
const logger = require("./config/logger");
const pool = require("./config/db");

async function startServer() {
    try {
        // Temporary debugging (remove after the database connects successfully)
        console.log("========== SQLShield Environment ==========");
        console.log("DB_HOST:", process.env.DB_HOST);
        console.log("DB_PORT:", process.env.DB_PORT);
        console.log("DB_NAME:", process.env.DB_NAME);
        console.log("DB_USER:", process.env.DB_USER);
        console.log("===========================================");

        // Test PostgreSQL connection
        await pool.query("SELECT NOW()");

        logger.info("Database connected successfully.");

        app.listen(PORT, () => {
            logger.info(`SQLShield API running on port ${PORT}`);
        });

    } catch (error) {
        logger.error("Database connection failed");
        logger.error(error);
        process.exit(1);
    }
}

startServer();