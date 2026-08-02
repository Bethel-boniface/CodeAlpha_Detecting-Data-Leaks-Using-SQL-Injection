const CapabilityModel = require("../models/capability.model");

class CapabilityService {

    static async hasCapability(role, capability) {

        console.log("Role received:", role);
        console.log("Capability requested:", capability);

        const capabilities =
            await CapabilityModel.findByRole(role);

        console.log("Capabilities from DB:");
        console.log(capabilities);

        const allowed = capabilities.some(
            c => c.capability_code === capability
        );

        console.log("Allowed:", allowed);

        return allowed;
    }

}

module.exports = CapabilityService;