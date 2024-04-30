const AuthView = require("../views/auth.view");
const AuthModel = require("../models/auth.model");
const HTTPCodes = require("../helpers/http_codes");


exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const result = await AuthModel.login(email, password);
		res.cookie("token", result.token, { secure: true });

		const successLoginRes = AuthView.login(HTTPCodes.Ok, result.message);
		return res.status(HTTPCodes.Ok).json(successLoginRes);
	}
	catch(error) {
		const loginErrRes = AuthView.login(HTTPCodes.InternalServerError, "Internal server error");
		console.log(error);
		return res.status(HTTPCodes.InternalServerError).json(loginErrRes);
	}
}

exports.logout = (req, res) => {

    return res.json(AuthView.auth_works("logout"));
}