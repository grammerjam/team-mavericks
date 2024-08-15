import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";
import { MoviesContext } from "../../context/Movies.context";
import { UserContext } from "../../context/User.context";
import { useContext, useEffect, useState } from "react";
import { Grid, Box, Stack, CircularProgress } from "@mui/material";
import MediaCard from "../../components/Media_Cards/MediaCard";


export const Bookmarks = () => {
    const apiUrl = getApiUrl();
    const { user } = useContext(UserContext);
    const { movies } = useContext(MoviesContext);
    const [bookmarkedMedia, setBookmarkedMedia] = useState([]);
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [bookmarkedShows, setBookmarkedShows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBookmarks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/bookmarks`,
                { params: { userID: user.id} }
            );
            return response.data.bookmarks;
        }catch(err){
            console.log('Error', err);
            if(err.response){
                console.error("Response error data", err.response.data);
                console.error("Response error status", err.response.status);
            }
        }finally {
            setIsLoading(false);
        }
    }

    const getBookmarkedMedia = (categoryType) => {
        const media = bookmarkedMedia.filter((movie) => {
            if(movie.category){
                return movie.category.toLowerCase().includes(categoryType);
            }
        });
        return media;
    };

    const handleUnbookmark = (id) => {
        setBookmarkedMedia(prev => prev.filter(item => item.id !== id));
    }

    useEffect(() => {
        const fetchBookmarkedMedia = async () => {
            const bookmarks = await getBookmarks();
            const bookmarkedMediaIDs = bookmarks.map(bookmark => bookmark.mediaID);

            const filteredMedia = movies.filter(movie => bookmarkedMediaIDs.includes(movie.id));

            setBookmarkedMedia(filteredMedia);
        }
        fetchBookmarkedMedia();
    },[movies]);

    useEffect(() => {
        setBookmarkedMovies(getBookmarkedMedia('movie'));
        setBookmarkedShows(getBookmarkedMedia('tv-series'));
    },[bookmarkedMedia]);

	return (
		<Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ):(
                <>
                    {bookmarkedMovies.length > 0 && (
                        <Stack sx={{mb: 6}}>
                            <Box color={"white"} className="font-heading-L media-heading">Bookmarked Movies</Box>
                            <div className="media-container">
                                <Grid container spacing= {4}>
                                    {
                                        bookmarkedMovies.map((movie, index) => (
                                            <Grid 
                                                item key={index}
                                                xs={6}
                                                sm={4}
                                                md={4}
                                                lg={3}
                                                xl={2.4}
                                            >
                                                <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark}/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </div>
                        </Stack>
                    )}
                    {bookmarkedShows.length > 0 && (
                        <Stack>
                            <Box color={"white"} className="font-heading-L media-heading">Bookmarked TV Series</Box>
                            <div className="media-container">
                                <Grid container spacing= {4}>
                                    {
                                        bookmarkedShows.map((movie, index) => (
                                            <Grid 
                                                item key={index}
                                                xs={6}
                                                sm={4}
                                                md={4}
                                                lg={3}
                                                xl={2.4}
                                            >
                                                <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark}/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </div>
                        </Stack>
                    )}
                    {bookmarkedMedia.length === 0 && (
                                <Box color={"white"} className="font-heading-L media-heading">No bookmarks yet!</Box>
                    )}
                </>
            )}
		</Box>
    )
};