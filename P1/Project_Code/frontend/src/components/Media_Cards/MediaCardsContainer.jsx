import MediaCard from "./MediaCard";
import { Grid, Stack, ThemeProvider } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import trendingTheme from "../../services/TrendingTheme"
import { MediaContainer, StyledBox } from "./MediaCardsContainer.styles";
import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";

const MediaCardsContainer = () => {

    const apiUrl = getApiUrl();
    const [movies, setMovies] = useState([]);

    const getMedia = async () => { 
        try{
            let allResults = [];
            for(let page = 1; page <= 2; page++){
                const trendingMedia = await axios.get(`${apiUrl}/media/trending`, {
                    params: {page, category: 'all' }
                });
                allResults = [...allResults, ...trendingMedia.data.results];
            }
            setMovies(allResults);
        }catch(error){
            console.error("Error displaying trending media", error);
            if(error.response){
                console.error("Response error data", error.response.data);
                console.error("Response error status", error.response.status);
            }
        }
    }

    useEffect(() => {
        getMedia();
    },[]);

    return (
        <Stack spacing={10}>
            <StyledBox color={"white"} className="font-heading-L trending-heading">Trending</StyledBox>
            <ThemeProvider theme={trendingTheme}>
                <div style={trendingTheme.root}>
                    <ImageList style={trendingTheme.ImageList} cols={2.5}>
                        {movies.slice(0, 10).map((movie, index) => (
                           <ImageListItem key={index}>
                                <MediaCard movie={movie} type="trending"/>
                           </ImageListItem> 
                        ))}
                    </ImageList>
                </div>
            </ThemeProvider>

            <Grid>
                <StyledBox color={"white"} className="font-heading-L media-heading">Recommended for you</StyledBox>
                <MediaContainer>
                    <Grid container spacing={4}>
                        {
                            movies.slice(10, movies.length).map((movie, index) => (
                                <Grid 
                                    item key={index}
                                    xs={6}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    xl={2.4}
                                >
                                    <MediaCard movie={movie} type="recommended"/>
                                </Grid>
                                )
                            )
                        }
                    </Grid>
                </MediaContainer>
            </Grid>
        </Stack>
    )
}

export default MediaCardsContainer;