const CapabilityModel = require("../models/capability.model");

class CapabilityService {

    static async hasCapability(role, capability) {

        console.log("\n========================================");
        console.log("CAPABILITY SERVICE");
        console.log("========================================");
        console.log("Role received:", JSON.stringify(role));
        console.log("Capability requested:", JSON.stringify(capability));

        try {

            const capabilities =
                await CapabilityModel.findByRole(role);

            console.log("Database capabilities:");

            console.log(
                JSON.stringify(
                    capabilities,
                    null,
                    2
                )
            );

            const allowed = capabilities.some(
                c =>
                    String(c.capability_code).trim() ===
                    String(capability).trim()
            );

            console.log(
                "Capability comparison:"
            );

            console.log(
                "Requested:",
                JSON.stringify(capability)
            );

            console.log(
                "Allowed:",
                allowed
            );

            console.log(
                "========================================\n"
            );

            return allowed;

        } catch (error) {

            console.error(
                "CAPABILITY SERVICE ERROR:"
            );

            console.error(error);

            throw error;

        }

    }

}

module.exports = CapabilityService;