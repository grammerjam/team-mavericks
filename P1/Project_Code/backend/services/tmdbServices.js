const axios = require('axios');

const tmdbApiKey = process.env.TMBD_API_KEY;
const tmdbBaseUrl = "https://api.themoviedb.org/3";

const getTrendingMedia = async (page = 1, category = 'all') => {
    try{
        const response = await axios.get(`${tmdbBaseUrl}/trending/${category}/day`, {
            params: {
                api_key: tmdbApiKey,
                language: 'en-US',
                page
            }
        })
        return response.data;
    }catch(error) {
        console.error("Error fetching trending media", error);
        throw error;
    }
}

const getMediaDetails = async (mediaID, category) => {
    try{
        const response = await axios.get(`${tmdbBaseUrl}/${category}/${mediaID}`, {
            params: {
                api_key: tmdbApiKey,
                language: 'en-US',
            }
        })
        return response.data;
    }catch(error){
        console.error("Error fetching media details", error);
        throw error;
    }
}

module.exports = { getTrendingMedia, getMediaDetails };