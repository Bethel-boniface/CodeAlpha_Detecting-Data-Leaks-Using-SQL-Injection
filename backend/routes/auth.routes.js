const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/auth.controller");

const validate =
require("../middleware/validate");

const {

    registerValidation,

    loginValidation

} =
require("../validators/auth.validator");

router.post(

    "/register",

    registerValidation,

    validate,

    controller.register

);

router.post(

    "/login",

    loginValidation,

    validate,

    controller.login

);

module.exports = router;