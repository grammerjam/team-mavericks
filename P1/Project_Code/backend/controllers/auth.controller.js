const AuthView = require("../views/auth.view");
const AuthModel = require("../models/auth.model");
const HTTPCodes = require("../helpers/http_codes");

//Handle user login requests.
exports.login = async (req, res) => {
	try {
		// Extract email and password from the request body
		const { email, password } = req.body;
		// Check if email and password are provided and return an error response if they are missing
		if(!email || !password){
			const missingInfoRes = AuthView.login(HTTPCodes.BadRequest, "The attributes email and password are required");
			return res.status(HTTPCodes.BadRequest).json(missingInfoRes);
		}
		// Attempt to authenticate user with provided credentials
		const result = await AuthModel.login(email, password);
		// Set token cookie for authenticated user
		res.cookie("token", result.token, { secure: true });
		// Send success response upon successful login
		const successLoginRes = AuthView.login(HTTPCodes.Ok, result.message);
		return res.status(HTTPCodes.Ok).json(successLoginRes);
	}
	catch(error) {
		// Handle any internal server errors and log the error
		const loginErrRes = AuthView.login(HTTPCodes.InternalServerError, "Internal server error");
		console.log(error);
		return res.status(HTTPCodes.InternalServerError).json(loginErrRes);
	}
}
//Handle user logout requests.
exports.logout = (req, res) => {
	// Clear the authentication token cookie and send success message
	res.clearCookie("token");
	return res.status(HTTPCodes.Ok).json({ message: "Logged out successfully" });
}