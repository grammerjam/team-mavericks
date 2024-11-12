const BookmarkModel = require('../models/bookmark.model');
const getMediaJson = require('../services/getMediaJson');
const { getMediaDetails } = require('../services/tmdbServices');


//Add new bookmark
exports.bookmarkItem = async (req, res) => {
    const { userID, mediaID, mediaType } = req.body;

    try{
        const mediaDetails = await getMediaDetails(mediaID, mediaType);
        const { 
            title, 
            name, 
            poster_path, 
            backdrop_path, 
            overview, 
            release_date, 
            first_air_date 
        } = mediaDetails;

        const mediaTitle = mediaType === "movie" ? title : name;
        const mediaReleaseDate = mediaType === "movie" ? release_date : first_air_date;

        const bookmark = await BookmarkModel.addBookmark({
            userID,
            mediaID,
            title: mediaTitle,
            posterPath: poster_path,
            backdropPath: backdrop_path,
            overview,
            mediaType,
            releaseDate: mediaReleaseDate,
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

        const bookmarkedMedia = bookmarks.map(bookmark => ({
            mediaID: bookmark.mediaID,
            title: bookmark.title,
            posterPath: bookmark.posterPath,
            backdropPath: bookmark.backdropPath,
            overview: bookmark.overview,
            releaseDate: bookmark.releaseDate,
            mediaType: bookmark.mediaType
        }));
        res.status(200).json({
            userID: userID,
            bookmarks: bookmarkedMedia
        })
    } catch (error){
        console.log('Error finding bookmarks', error.message);
        res.status(500).json({ error: 'Falied to find all bookmarks' });
    }
}



