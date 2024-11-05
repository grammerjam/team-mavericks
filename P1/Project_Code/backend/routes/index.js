const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const bookmarkRouter = require('./bookmark.route');
const mediaRouter = require('./media.route');

module.exports = {
    authRouter,
    userRouter,
    bookmarkRouter,
    mediaRouter
};