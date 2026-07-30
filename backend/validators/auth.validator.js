const {

    body

} = require("express-validator");

exports.registerValidation = [

    body("username")
        .trim()
        .isLength({
            min: 3,
            max: 50
        }),

    body("email")
        .isEmail(),

    body("password")
        .isLength({
            min: 8
        })

];

exports.loginValidation = [

    body("email")
        .isEmail(),

    body("password")
        .notEmpty()

];