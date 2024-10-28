const { getTrendingMedia } = require("../services/tmdbServices");

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