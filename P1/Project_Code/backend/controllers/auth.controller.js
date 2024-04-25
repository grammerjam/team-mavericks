const AuthView = require("../views/auth.view");

exports.login = (req, res) => {

    return res.json(AuthView.auth_works("login"));
}

exports.logout = (req, res) => {

    return res.json(AuthView.auth_works("logout"));
}