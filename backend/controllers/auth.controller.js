const AuthService =
require("../services/auth.service");

exports.register =
async (req, res, next) => {

    try {

        const user =
            await AuthService.register(
                req.body
            );

        res.status(201).json({

            success: true,

            user

        });

    } catch (error) {

        next(error);

    }

};

exports.login =
async (req, res, next) => {

    try {

        const result =
            await AuthService.login(

                req.body.email,

                req.body.password

            );

        res.json({

            success: true,

            token: result.token,

            user: result.user

        });

    } catch (error) {

        next(error);

    }

};