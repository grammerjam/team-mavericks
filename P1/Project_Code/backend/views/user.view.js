// Import HTTP Codes
const HTTPCodes = require("../helpers/http_codes");

class UserView
{
    /**
     * data -> Data to be returned in case of success
     * http_code -> HTTP Response Code that determines success or error
     * error_msg -> Error message to be returned in case of error
     */
    static register(data, http_code, error_msg)
    {
        // If the http_code is not Created. Return error message
        if (http_code !== HTTPCodes.Created)
        {
            return {
                error: error_msg
            };
        }

        // Grab id, user, and email from data
        const { id, username, email } = data;

        // Return an object with those keys
        return {
            id,
            username,
            email
        };
    }

    static getUsers(users, http_code, error_msg)
    {
        // If the http_code is not Ok, return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: error_msg
            };
        }

        // Loop through each user
        for (let i = 0; i < users.length; i++)
        {
            // Grab info we need
            const { id, username, email } = users[i];

            // Place that in every user obj
            users[i] = {
                id,
                username,
                email
            }
        }

        // Return the users now
        return users;
    }

    static getUser(data, http_code, error_msg)
    {
        // If the http_code is not Ok, return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: error_msg
            };
        }

        // Otherwise, extract id, username, and email from data
        const { id, username, email } = data;

        // Return an object with the filtered keys
        return {
            id,
            username,
            email
        };
    }

    static update(data, http_code, error_msg)
    {
        // If the http_code is not Accepted. Return error message
        if (http_code !== HTTPCodes.Accepted)
        {
            return {
                error: error_msg
            };
        }

        const { id, username, email, photo } = data;

        return {
            id,
            username,
            email,
            photo
        };
    }

    static delete(data, http_code, error_msg)
    {
        // If the code is not Ok. Return error message
        if (http_code !== HTTPCodes.NoContent)
        {
            return {
                error: error_msg
            }
        }

        // Grab user id
        const { id } = data;

        return {
            message: `The user of id ${id} was successfully deleted`
        };
    }
}

module.exports = UserView;