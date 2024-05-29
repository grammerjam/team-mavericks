/** Utility Script meant to assist with cookie operations in the front-end */

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function getCookie(cookieName)
{
    return Cookies.get(cookieName);
}

function decodeJwtCookie(cookie)
{
    // Read the token if it is set
    if (cookie)
    {
        try
        {
            const decoded = jwtDecode(cookie);
            return decoded;
        }

        catch (err)
        {
            console.log(err);
            return null;
        }
    }

    return null;
}

export {
    getCookie,
    decodeJwtCookie
};
