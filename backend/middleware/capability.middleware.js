const CapabilityService = require("../services/capability.service");

module.exports = (requiredCapability) => {

    return async (req, res, next) => {

        console.log("\n========== CAPABILITY MIDDLEWARE ==========");
        console.log("User:", req.user);
        console.log("Required:", requiredCapability);

        const allowed = await CapabilityService.hasCapability(
            req.user.role,
            requiredCapability
        );

        console.log("Middleware Result:", allowed);
        console.log("===========================================\n");

        if (!allowed) {
            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }

        next();

    };

};