const AuthView = require("../views/auth.view");

exports.register = (req, res) => 
{
    // Reading JSON Data
    //const { email } = req.body;

    // Return JSON response
    return res.json(AuthView.auth_works("register"));
}

exports.login = (req, res) => {

    return res.json(AuthView.auth_works("login"));
}

exports.logout = (req, res) => {

    return res.json(AuthView.auth_works("logout"));
}