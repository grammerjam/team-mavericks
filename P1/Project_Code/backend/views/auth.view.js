const HTTPCodes = require("../helpers/http_codes");

class AuthView 
{
    static login(data, http_code, error_msg)
    {
        // If the http_code is not Ok. Return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: error_msg
            };
        }

        return data;
    }

    static logout(data, http_code, error_msg)
    {
        // If the http_code is not Ok. Return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: error_msg
            };
        }

        return data;
    }
}

module.exports = AuthView;