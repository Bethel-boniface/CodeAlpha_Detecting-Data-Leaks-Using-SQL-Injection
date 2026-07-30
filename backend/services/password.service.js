const bcrypt = require("bcrypt");

const security =
require("../config/security");

exports.hash =
async (password) => {

    return bcrypt.hash(

        password,

        security.bcrypt.saltRounds

    );

};

exports.compare =
async (
    password,
    hash
) => {

    return bcrypt.compare(

        password,

        hash

    );

};