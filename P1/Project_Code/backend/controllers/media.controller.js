const { getTrendingMedia, searchMedia, getMediaDetails } = require("../services/tmdbServices");
const xss = require("xss");

//Fetch trending media
//@params page: choose page nuber(eg. 1, 2)
//@params category: choose media type(eg. all, movie, tv)
exports.fetchTrendingMedia = async (req, res) => {
    const { page, category } = req.query;
    try{
        const trendingMedia = await getTrendingMedia(page, category);
        console.log("Trending media fetched successfully");
        res.status(200).json(trendingMedia);
    }catch(error){
        console.error("Error fetching media", error);
        res.status(500).json({error: "Failed to fetch media"});
    }
}

exports.searchMediaItems = async (req, res) => {
    const { query } = req.query;
    try{
        const results = await searchMedia(xss(query));
        console.log("Search successful");
        res.status(200).json(results);
    }catch(error){
        console.error("Error searching for media", error);
        res.status(500).json({error: "Failed media search"});
    }
}

exports.fetchMediaItem = async (req, res) => {
    const { mediaID, category } = req.query;

    try{
        const mediaData = await getMediaDetails(mediaID, category);
        console.log("Fetched media successful");
        res.status(200).json(mediaData)
    }catch(error){
        console.error("Error fetching media item", error);
        res.status(500).json({error: "Failed to fetch media item"});
    }
}