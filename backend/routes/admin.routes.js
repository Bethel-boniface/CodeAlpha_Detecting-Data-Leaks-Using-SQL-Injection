const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const authenticate = require("../middleware/auth.middleware");
const authorizeCapability = require("../middleware/capability.middleware");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    authenticate,
    authorizeCapability("VIEW_DASHBOARD"),
    adminController.getDashboard
);

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/analytics",
    authenticate,
    authorizeCapability("VIEW_DASHBOARD"),
    adminController.getAnalytics
);

/*
|--------------------------------------------------------------------------
| Attack Chart
|--------------------------------------------------------------------------
*/

router.get(
    "/attack-chart",
    authenticate,
    authorizeCapability("VIEW_DASHBOARD"),
    adminController.getAttackChart
);

/*
|--------------------------------------------------------------------------
| Threat Monitor
|--------------------------------------------------------------------------
*/

router.get(
    "/threat-monitor",
    authenticate,
    authorizeCapability("VIEW_SECURITY_EVENTS"),
    adminController.getThreatMonitor
);

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

router.get(
    "/users",
    authenticate,
    authorizeCapability("VIEW_USERS"),
    adminController.getUsers
);

router.patch(
    "/users/:id/activate",
    authenticate,
    authorizeCapability("MANAGE_USERS"),
    adminController.activateUser
);

router.patch(
    "/users/:id/deactivate",
    authenticate,
    authorizeCapability("MANAGE_USERS"),
    adminController.deactivateUser
);

/*
|--------------------------------------------------------------------------
| Security Events
|--------------------------------------------------------------------------
*/

router.get(
    "/security-events",
    authenticate,
    authorizeCapability("VIEW_SECURITY_EVENTS"),
    adminController.getSecurityEvents
);

module.exports = router;