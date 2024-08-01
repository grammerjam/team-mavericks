const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

//Bookmark Model Schema
const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    mediaID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Bookmark.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Bookmark, { foreignKey: 'userID' });

module.exports = Bookmark;


