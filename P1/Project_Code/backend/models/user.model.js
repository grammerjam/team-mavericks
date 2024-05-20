const { DataTypes } = require('sequelize');
const { getRounds } = require("bcrypt");
const sequelize = require('../config/database');

//User Model Schema
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Invalid Email Format"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isBcryptHash(val) {
        if (!getRounds(val))
        {
          throw new Error("Password is not hashed in Bcrypt");
        }
      }
    }
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isURL: {
        msg: "Invalid URL Format"
      }
    }
  }
});

// Add static method to get all users
User.getAllUsers = async() => {
  return await User.findAll();
};

// Add static method to grab user by ID
User.getUserById = async(id) => {
  return await User.findByPk(id);
};

// Add static method to get user by username
User.getUserByUsername = async(username) => {
  return await User.findOne({ where: { username }});
};

// Add static method to get user by email
User.getUserByEmail = async(email) => {
  return await User.findOne({ where: { email }});
};

// Add static method to register new user
User.register = async(userData) => {
  return await User.create(userData);
};

// Add static method to update user by id
User.updateUserById = async(id, userData) => {
  return await User.update(userData, { where: { id } });
}

// Add static method to delete user by id
User.deleteById = async (id) => {
  return await User.destroy({ where: { id }});
};

module.exports = User;
