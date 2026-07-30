const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ================================
// Middleware
// ================================

const requestLogger = require("./middleware/requestLogger");
const rateLimiter = require("./middleware/rateLimiter");
const sqlInjectionDetector = require("./middleware/sqlInjectionDetector");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// ================================
// Routes
// ================================

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const securityRoutes = require("./routes/security.routes");

const app = express();

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(

    helmet({

        crossOriginResourcePolicy: false

    })

);

app.use(

    cors({

        origin: "*",

        credentials: true

    })

);

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(

    express.json({

        limit: "10mb"

    })

);

app.use(

    express.urlencoded({

        extended: true

    })

);

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
*/

app.use(requestLogger);

/*
|--------------------------------------------------------------------------
| Rate Limiting
|--------------------------------------------------------------------------
*/

app.use(rateLimiter);

/*
|--------------------------------------------------------------------------
| SQLShield Detection Engine
|--------------------------------------------------------------------------
|
| Every request is inspected except the Playground endpoint,
| because it intentionally receives malicious SQL payloads.
|
*/

app.use((req, res, next) => {

    if (

        req.originalUrl.startsWith(

            "/api/v1/security/analyze"

        )

    ) {

        return next();

    }

    return sqlInjectionDetector(

        req,

        res,

        next

    );

});

/*
|--------------------------------------------------------------------------
| Root Endpoint
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

    return res.status(200).json({

        success: true,

        application: "SQLShield",

        version: "1.0.0",

        status: "Running",

        timestamp: new Date()

    });

});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(

    "/api/v1/health",

    healthRoutes

);

app.use(

    "/api/v1/auth",

    authRoutes

);

app.use(

    "/api/v1/admin",

    adminRoutes

);

app.use(

    "/api/v1/security",

    securityRoutes

);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(notFound);

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

module.exports = app;