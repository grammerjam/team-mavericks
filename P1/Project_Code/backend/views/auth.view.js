const HTTPCodes = require("../helpers/http_codes");

class AuthView 
{
    static login(http_code, msg)
    {
        // If the http_code is not Ok. Return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: msg
            };
        }

        return {
            message: msg
        }
    }
}

module.exports = AuthView;