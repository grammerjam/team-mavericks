const UserModel = require('./user.model');
const BookmarkModel = require('./bookmark.model');

//Associations
UserModel.hasMany(BookmarkModel, { foreignKey: 'userID' });
BookmarkModel.belongsTo(UserModel, { foreignKey: 'userID' });

module.exports = {
	UserModel,
	BookmarkModel
}