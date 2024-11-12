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
    title: {
        type: DataTypes.STRING  
    },
    posterPath: {
        type: DataTypes.STRING   
    },
    backdropPath: {
        type: DataTypes.STRING  
    },
    overview: {
        type: DataTypes.STRING  
    },
    releaseDate: {
        type: DataTypes.STRING  
    },
    mediaType: {
        type: DataTypes.STRING  
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

//Create Associations
Bookmark.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Bookmark, { foreignKey: 'userID' });

// Add static method to add new bookmark
Bookmark.addBookmark = async(bookmarkData) => {
    return await Bookmark.create(bookmarkData);
};

// Add static method to delete bookmark
Bookmark.deleteBookmark = async (userID, mediaID) => {
    return await Bookmark.destroy({ where: { userID, mediaID }});
};

// Add static method to get all bookmarks for a user
Bookmark.findUserBookmarks = async(userID) => {
    return await Bookmark.findAll({ where: { userID } });
};


module.exports = Bookmark;


