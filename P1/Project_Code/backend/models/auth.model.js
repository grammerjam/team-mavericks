const UserModel = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

//Authenticate user with provided email and password.
//@returns {Object} An object containing a token and a message indicating the authentication status.
exports.login = async (email, password) => {
	try {
		// Retrieve user from the database based on the provided email
		const user = await UserModel.getUserByEmail(email);
		if(user){
			// If user exists, compare the provided password with the stored hash
			const match = await bcrypt.compare(password, user.password);
			if(match){
				// If passwords match, generate a JWT token for the user
				const token = jwt.sign(
					{ username: user.username, email: user.email, userId: user.id },
					secret,
					{ expiresIn: "1h" }
				);
				// Return token and success message
				return { token, message: "Success" };
			}else{
				return { message: "Incorrect password" };
			}
		}else{
			return { message: "User not found" };
		}
	}
	catch(error){
		// Throw any errors encountered during the authentication process
		throw error;
	}
};