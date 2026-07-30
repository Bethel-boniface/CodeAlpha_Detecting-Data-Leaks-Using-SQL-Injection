const jwt = require("../services/jwt.service");

module.exports = (req, res, next) => {

    console.log("\n========================================");
    console.log("AUTH MIDDLEWARE");
    console.log("========================================");

    console.log("Method:", req.method);
    console.log("Endpoint:", req.originalUrl);

    const header = req.headers.authorization;

    console.log("Authorization Header:", header);

    if (!header) {

        console.log("No Authorization header received.");

        return res.status(401).json({

            success: false,

            message: "Authentication required"

        });

    }

    if (!header.startsWith("Bearer ")) {

        console.log("Authorization header is not a Bearer token.");

        return res.status(401).json({

            success: false,

            message: "Invalid authorization format"

        });

    }

    const token = header.substring(7);

    console.log("Extracted Token:");
    console.log(token);

    try {

        const decoded = jwt.verifyToken(token);

        console.log("JWT VERIFIED SUCCESSFULLY");
        console.log("Decoded User:");
        console.log(decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT VERIFICATION FAILED");
        console.log(error);

        return res.status(401).json({

            success: false,

            message: "Invalid token"

        });

    }

};