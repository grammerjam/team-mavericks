import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";
import { MoviesContext } from "../../context/Movies.context";
import { UserContext } from "../../context/User.context";
import { useContext, useEffect, useState } from "react";
import { Grid, Box, Stack, CircularProgress } from "@mui/material";
import MediaCard from "../../components/Media_Cards/MediaCard";
import { MediaContainer, StyledBox } from "../../components/Media_Cards/MediaCardsContainer.styles";
import { momentum } from 'ldrs'


export const Bookmarks = () => {
    const apiUrl = getApiUrl();
    const { user } = useContext(UserContext);
    const { movies } = useContext(MoviesContext);
    const [bookmarkedMedia, setBookmarkedMedia] = useState([]);
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [bookmarkedShows, setBookmarkedShows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBookmarks = async () => {
        momentum.register()
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
            if(movie.mediaType){
                return movie.mediaType.toLowerCase().includes(categoryType);
            }
        });
        return media;
    };

    const handleUnbookmark = (id) => {
        setBookmarkedMedia(prev => 
            prev.filter(item => {
                return item.mediaID !== id;
            })
        );
    };

    useEffect(() => {
        const fetchBookmarkedMedia = async () => {
            const bookmarks = await getBookmarks();
            setBookmarkedMedia(bookmarks);
        }
        fetchBookmarkedMedia();
    },[]);

    useEffect(() => {
        setBookmarkedMovies(getBookmarkedMedia('movie'));
        setBookmarkedShows(getBookmarkedMedia('tv'));
    },[bookmarkedMedia]);

	return (
		<Box className="page-container">
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <l-momentum
                    size="50"
                    speed="1.1" 
                    color="white" 
                    ></l-momentum>
                </Box>
            ):(
                <>
                    {bookmarkedMovies.length > 0 && (
                        <Stack sx={{mb: 6}}>
                            <StyledBox color={"white"} className="font-heading-L media-heading">Bookmarked Movies</StyledBox>
                            <MediaContainer>
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
                                                <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark} isBookmarkedMedia/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </MediaContainer>
                        </Stack>
                    )}
                    {bookmarkedShows.length > 0 && (
                        <Stack>
                            <StyledBox color={"white"} className="font-heading-L media-heading">Bookmarked TV Series</StyledBox>
                            <MediaContainer>
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
                                                <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark} isBookmarkedMedia/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </MediaContainer>
                        </Stack>
                    )}
                    {bookmarkedMedia.length === 0 && (
                                <StyledBox color={"white"} className="font-heading-L media-heading">No bookmarks yet!</StyledBox>
                    )}
                </>
            )}
		</Box>
    )
};