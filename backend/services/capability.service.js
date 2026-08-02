const CapabilityModel = require("../models/capability.model");

class CapabilityService {

    static async hasCapability(role, capability) {

        const capabilities = await CapabilityModel.findByRole(role);

        console.log("\n========== CAPABILITY SERVICE ==========");
        console.log("Role:", role);
        console.log("Required Capability:", capability);
        console.log("Capabilities from Database:");
        console.log(capabilities);

        const allowed = capabilities.some(
            c => c.capability_code === capability
        );

        console.log("Allowed:", allowed);
        console.log("========================================\n");

        return allowed;

    }

}

module.exports = CapabilityService;