const UserModel = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

exports.login = async (email, password) => {
	try {
		const user = await UserModel.getUserByEmail(email);
		if(user){
			const match = await bcrypt.compare(password, user.password);
			if(match){
				const token = jwt.sign(
					{ username: user.username, email: user.email, userId: user.id },
					secret,
					{ expiresIn: "1h" }
				);
				return { token, message: "Success" };
			}else{
				return { message: "Incorrect password" };
			}
		}else{
			return { message: "User not found" };
		}
	}
	catch(error){
		throw error;
	}
};