// Represent the meaning of each HTTP Code here

class HTTPCodes
{
    static Ok = 200;
    static Created = 201;
    static Accepted = 202;
    static NoContent = 204;
    static BadRequest = 400;
    static Unauthorized = 401;
    static Forbidden = 403;
    static NotFound = 404;
    static Conflict = 409;
    static InternalServerError = 500;
}

module.exports = HTTPCodes;