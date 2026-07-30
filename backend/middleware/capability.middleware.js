const CapabilityService =
require("../services/capability.service");

module.exports =
(requiredCapability) => {

    return async (

        req,

        res,

        next

    ) => {

        const allowed =

            await CapabilityService.hasCapability(

                req.user.role,

                requiredCapability

            );

        if (!allowed) {

            return res.status(403).json({

                success:false,

                message:

                "Access denied."

            });

        }

        next();

    };

};