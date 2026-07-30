const jwt =
require("jsonwebtoken");

const {

    JWT_SECRET

} =
require("../config/env");

const security =
require("../config/security");

exports.generateToken =
(user) => {

    return jwt.sign(

        {

            id:user.id,

            email:user.email,

            role:user.role

        },

        JWT_SECRET,

        {

            expiresIn:
                security.jwt.expiresIn

        }

    );

};

exports.verifyToken =
(token) => {

    return jwt.verify(

        token,

        JWT_SECRET

    );

};