const xss = require("xss");

const AuthView = require("../views/auth.view");
const AuthModel = require("../models/auth.model");
const HTTPCodes = require("../helpers/http_codes");

//Handle user login requests.
exports.login = async (req, res) => {
	try {
		// Extract email and password from the request body
		const { email, password } = req.body;

		// Check if email and password are provided and return an error response if they are missing
		if(!xss(email) || !xss(password)){
			const missingInfoRes = AuthView.login(HTTPCodes.BadRequest, "The attributes email and password are required");
			return res.status(HTTPCodes.BadRequest).json(missingInfoRes);
		}

		// Attempt to authenticate user with provided credentials
		const result = await AuthModel.login(xss(email), xss(password));

		// Check if the login attempt was successful
		if (result.token)
		{
			// Set token cookie for authenticated user
			res.cookie("token", result.token, { 
				path: "/",
				secure: true,
				httpOnly: true,
				sameSite: "None",
				maxAge: 3600000 // 1 Hour
			 });

			// Send success response upon successful login
			const successLoginRes = AuthView.login({
				id: result.id,
				email: result.email
			},HTTPCodes.Ok, null);

			return res.status(HTTPCodes.Ok).json(successLoginRes);
		}

		else if (result.error == "User not found")
		{
			const userNotFoundResponse = AuthView.login(null, HTTPCodes.NotFound, result.error);

			return res.status(HTTPCodes.NotFound).json(userNotFoundResponse);
		}

		else
		{
			const incorrectCredentialsResponse = AuthView.login(null, HTTPCodes.BadRequest, result.error);

			return res.status(HTTPCodes.BadRequest).json(incorrectCredentialsResponse);
		}

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
	// Check the token cookie is set from the client-side
	const token = req.cookies.token;

	// If the token is not set up, the user is not authenticated
	if (!token)
	{
		const unauthenticatedUserResponse = AuthView.logout(null, HTTPCodes.Unauthorized, "You are not authenticated to this application");
		return res.status(HTTPCodes.Unauthorized).json(unauthenticatedUserResponse);
	}

	// If the token is not valid, the user is not authenticated
	const tokenVerificationRes = AuthModel.verifyJWT(token);

	if (tokenVerificationRes.error)
	{
		const invalidJWTResponse = AuthView.logout(null, HTTPCodes.Unauthorized, tokenVerificationRes.error);
		return res.status(HTTPCodes.Unauthorized).json(invalidJWTResponse);
	}


	// Clear the authentication token cookie and send success message
	res.clearCookie("token");
	const successfulLogoutRes = AuthView.logout({ message: "Logged out successfully" }, HTTPCodes.Ok, null);
	return res.status(HTTPCodes.Ok).json(successfulLogoutRes);
}