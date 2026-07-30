const express = require("express");

const router = express.Router();

const {
    analyzeSecurityPayload
} = require("../controllers/security.controller");

const authenticate =
    require("../middleware/auth.middleware");

/*
|--------------------------------------------------------------------------
| Security Analysis
|--------------------------------------------------------------------------
*/

router.post(

    "/analyze",

    authenticate,

    analyzeSecurityPayload

);

module.exports = router;