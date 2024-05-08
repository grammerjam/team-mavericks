// Import dependencies
const { genSaltSync, hashSync } = require("bcrypt");
const { isEmail } = require("validator");

// Custom dependencies
const HTTPCodes = require("../helpers/http_codes");
const UserView = require("../views/user.view");
const UserModel = require("../models/user.model");

// Create a new user
exports.register = async (req, res) => {

    // Grab user Data from JSON
    const userData = req.body;

    // Check for compulsory keys
    const mustHaveKeys = ["username", "email", "password"];

    // If no compulsory key is defined, return error
    for (const key of mustHaveKeys)
    {
        if (!userData.hasOwnProperty(key) || userData[key] === null || userData[key] == undefined)
        {
            // Grab the response object from user view
            const missingInfoResObj = UserView.register(null, HTTPCodes.BadRequest, `The attribute "${key}" is missing, null, or undefined`);

            return res.status(HTTPCodes.BadRequest).json(missingInfoResObj);
        }
    }

    // Generate a sync hash for the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(userData.password, salt);

    // Try to register the user
    try
    {
        const newUserData = await UserModel.register({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        });

        // Prepare a successful response for a created user
        const newUserDataResponse = UserView.register(newUserData, HTTPCodes.Created, null);

        // Return a successful response once the user is created
        return res.status(HTTPCodes.Created).json(newUserDataResponse);
    }

    catch (error)
    {
        // Prepare an error repsonse
        const newUserErrorResponse = UserView.register(null, HTTPCodes.InternalServerError, "Could not register user in the database");

        // Console log error to see what went wrong
        console.log(error);

        return res.status(HTTPCodes.InternalServerError).json(newUserErrorResponse);
    } 
};

// Grab users in DB
exports.getAllUsers = async (req, res) => {

    try
    {
        // Grab users from the DB
        const usersArray = await UserModel.getAllUsers();

        // If the usersArray is empty, return no user found
        if (usersArray.length === 0)
        {
            const noUsersFoundResponse = UserView.getUsers(null, HTTPCodes.NotFound, "No users were found in the database");

            return res.status(HTTPCodes.NotFound).json(noUsersFoundResponse);
        }

        const usersResponse = UserView.getUsers(usersArray, HTTPCodes.Ok, null);

        return res.status(HTTPCodes.Ok).json(usersResponse);
    }

    catch (error)
    {
        const usersErrorResponse = UserView.getUsers(null, HTTPCodes.InternalServerError, "Could not try to get users from the database");

        return res.status(HTTPCodes.InternalServerError).json(usersErrorResponse);
    }
};

// Grab a user by the id
exports.getUserById = async (req, res) => {

    // Grab id from GET Query Parameter
    const { id } = req.query;

    // Ensure the id is a positive whole number
    if (isNaN(id) || ( Number.isInteger(id) && id > 0 ))
    {
        const invalidIdResponse = UserView.getUser(null, HTTPCodes.BadRequest, `Invalid id parameter: ${id}`);

        return res.status(HTTPCodes.BadRequest).json(invalidIdResponse);
    }

    try
    {
        // Try to grab the user by its id
        const userData = await UserModel.getUserById(id);

        // If userData is null, then the user was not found
        if (!userData)
        {
            const userNotFoundResponse = UserView.getUser(null, HTTPCodes.NotFound, `user of id ${id} was not found`);

            return res.status(HTTPCodes.NotFound).json(userNotFoundResponse);
        }

        // Form a response based on the given data
        const userDataResponse = UserView.getUser(userData, HTTPCodes.Ok, null);

        // Provide a response to the user
        return res.status(HTTPCodes.Ok).json(userDataResponse);

    }

    catch (error)
    {
        // Form an error response
        const userErrorResponse = UserView.getUser(null, HTTPCodes.InternalServerError, `Could not try to get user of id ${id}`);

        // Console Log Error Just In Case
        console.log(error);

        // Return JSON HTTP Error Response
        return res.status(HTTPCodes.InternalServerError).json(userErrorResponse);
    }
};

// Grab a user by the username
exports.getUserByUsername = async (req, res) => {

    // Grab username from GET Query Parameter
    const { username } = req.query;

    // Try to grab the user from the DB
    try
    {
        const userData = await UserModel.getUserByUsername(username);

        // If userData is null, the user was not found
        if (!userData)
        {
            const userNotFoundResponse = UserView.getUser(null, HTTPCodes.NotFound, `User of username ${username} was not found`);

            return res.status(HTTPCodes.NotFound).json(userNotFoundResponse);
        }

        // Return user data
        const userDataResponse = UserView.getUser(userData, HTTPCodes.Ok, null);

        return res.status(HTTPCodes.Ok).json(userDataResponse);
    }

    catch (error)
    {
        // Form an error response for the user
        const userErrorResponse = UserView.getUser(null, HTTPCodes.InternalServerError, `Could not try to get user of username ${username}`);

        console.log(error);

        return res.status(HTTPCodes.InternalServerError).json(userErrorResponse);
    }

};

// Grab a user by the email
exports.getUserByEmail = async (req, res) => {

    // Grab email from GET Query Parameter
    const { email } = req.query;

    // If email is not invalid, return early error response
    if (!isEmail(email))
    {
        const invalidEmailResponse = UserView.getUser(null, HTTPCodes.BadRequest, `Invalid Email Parameter: ${email}`);

        return res.status(HTTPCodes.BadRequest).json(invalidEmailResponse);
    }

    try
    {
        const userData = await UserModel.getUserByEmail(email);

        // If userData is null, the user was not found
        if (!userData)
        {
            const userNotFoundResponse = UserView.getUser(null, HTTPCodes.NotFound, `User of email ${email} was not found`);
            
            return res.status(HTTPCodes.NotFound).json(userNotFoundResponse);
        }

        const userDataResponse = UserView.getUser(userData, HTTPCodes.Ok, null);

        return res.status(HTTPCodes.Ok).json(userDataResponse);
    }

    catch (error)
    {
        const userErrorResponse = UserView.getUser(null, HTTPCodes.InternalServerError, `Could not try to get user of email ${email}`);

        console.log(error);

        return res.status(HTTPCodes.InternalServerError).json(userErrorResponse);
    }
};


//Update user and return updated user object
exports.updateUser = async (req, res) => {

    //Grab user data from request body
    const {
        userId,
        username,
        email,
        photo
    } = req.body;

    // Ensure the id is a positive whole number
    if (isNaN(userId) || ( Number.isInteger(userId) && userId > 0 )){
        const invalidIdResponse = UserView.getUser(null, HTTPCodes.BadRequest, `Invalid id parameter: ${userId}`);

        return res.status(HTTPCodes.BadRequest).json(invalidIdResponse);
    }

    if (!username || !email){
        // Grab the response object from user view
        const missingInfoRes = UserView.update(null, HTTPCodes.BadRequest, `The attributes username and email are required`);
        return res.status(HTTPCodes.BadRequest).json(missingInfoRes);
    }

    try {
        //Updates user and returns number of rows updated
        await UserModel.updateUser(userId, { username, email, photo });

        // Prepare a successful response for an updated user
        const updatedUserRes = UserView.update(null, HTTPCodes.Accepted, 'User updated successfully');
        // Return a successful response once the user is updated
        return res.status(HTTPCodes.Accepted).json(updatedUserRes);
    }
    catch (err){
        //Prepare an error response 
        const updatedUserErrRes = UserView.update(null, HTTPCodes.InternalServerError, "Unable to update user");
        //Error log
        console.log(err);
        return res.status(HTTPCodes.InternalServerError).json(updatedUserErrRes);
    }
}

// Delete user based on its id
exports.deleteUserById = async(req, res) => {

    // Grab id from JSON request body
    const { id } = req.body;

    // Ensure the id is a positive whole number
    if (isNaN(id) || !( Number.isInteger(id) && id > 0 ))
    {
        const invalidIdResponse = UserView.getUser(null, HTTPCodes.BadRequest, `Invalid id parameter: ${id}`);

        return res.status(HTTPCodes.BadRequest).json(invalidIdResponse);
    }

    // Try to delete the user
    try
    {
        // Try to grab the user by its id
        const userData = await UserModel.getUserById(id);

        // If userData is null, then the user was not found
        if (!userData)
        {
            const userNotFoundResponse = UserView.getUser(null, HTTPCodes.NotFound, `user of id ${id} was not found`);

            return res.status(HTTPCodes.NotFound).json(userNotFoundResponse);
        }

        // Now try to delete the user
        await UserModel.deleteById(id);

        // Return a response
        const userDeletedResponse = UserView.delete(userData, HTTPCodes.Ok, null);

        return res.status(HTTPCodes.Ok).json(userDeletedResponse);
        
    }

    catch (error)
    {
        const userErrorResponse = UserView.delete(null, HTTPCodes.InternalServerError, `Could not try to delete user of id ${id}`);

        console.log(error);

        return res.status(HTTPCodes.InternalServerError).json(userErrorResponse);
    }
    
};