const BookmarkModel = require('../models/bookmark.model');
const getMediaJson = require('../services/getMediaJson');


//Add new bookmark
exports.bookmarkItem = async (req, res) => {
    const { userID, mediaID } = req.body;

    try{
        const bookmark = await BookmarkModel.addBookmark({
            userID,
            mediaID
        });
        console.log('Bookmark successful');
        res.status(201).json(bookmark);
    } catch (error){
        console.log('Error bookmarking item', error.message);
        res.status(500).json({ error: 'Failed to bookmark item' });
    }
};

//Delete bookmark 
exports.unbookmarkItem = async (req, res) => {
    const { userID, mediaID } = req.query;

    try {
        await BookmarkModel.deleteBookmark(userID, mediaID);
        console.log('Unbookmark successful');
        res.status(200).json({message: "Item was successfully unbookmarked"});
    } catch (error){
        console.log('Error unbookmarking item', error.message);
        res.status(500).json({ error: 'Failed to unbookmark item' });
    }
};

//Find all user Bookmarks
exports.getUserBookmarks = async (req, res) => {
    const { userID } = req.query;
    try{
        const bookmarks = await BookmarkModel.findUserBookmarks(userID);
        const mediaJson = getMediaJson();

        const bookmarkedMedia = bookmarks.map(bookmark => {
            const mediaItem = mediaJson.find(media => media.id === bookmark.mediaID );
            return mediaItem ? { mediaID: mediaItem.id, title: mediaItem.title } : null;
        }).filter(item => item !== null);
        res.status(200).json({
            userID: userID,
            bookmarks: bookmarkedMedia
        });

    } catch (error){
        console.log('Error finding bookmarks', error.message);
        res.status(500).json({ error: 'Falied to find all bookmarks' });
    }
}



