/** Common Functions to be used throughout the whole backend */
const { genSaltSync, hashSync } = require("bcrypt");

function isValidId(id)
{
    /** Return true if a positive whole number was provided */
    return Number.isInteger(id) && id > 0;
}

function makeBcryptHash(str)
{
    /** Grab a string and make a bcrypt hash out of it */
    const salt = genSaltSync(10);
    const hashedStr = hashSync(str, salt);

    return hashedStr;
}

module.exports = {
    isValidId,
    makeBcryptHash
}