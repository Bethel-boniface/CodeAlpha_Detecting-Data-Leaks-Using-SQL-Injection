const CapabilityModel =
require("../models/capability.model");

class CapabilityService {

    static async hasCapability(
        role,
        capability
    ) {

        const capabilities =
            await CapabilityModel.findByRole(
                role
            );

        return capabilities.some(

            c =>
                c.capability_code === capability

        );

    }

}

module.exports =
CapabilityService;