import { useContext } from "react";
import MediaCard from "./MediaCard";
import { Box, Grid, Stack, ThemeProvider } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { MoviesContext } from "../../context/Movies.context";
import trendingTheme from "../../services/TrendingTheme"

const MediaCardsContainer = () => {

    const { movies } = useContext(MoviesContext);

    return (
        <Stack spacing={10}>
            <Box color={"white"} className="font-heading-L trending-heading">Trending</Box>
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
                <Box color={"white"} className="font-heading-L media-heading">Recommended for you</Box>
                <div className="media-container">
                    <Grid container spacing={4}>
                        {
                            movies.slice(4, movies.length-1).map((movie, index) => (
                                <Grid 
                                    item key={index}
                                    xs={6}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    xl={3}
                                >
                                    <MediaCard movie={movie} type="recommended"/>
                                </Grid>
                                )
                            )
                        }
                    </Grid>
                </div>
            </Grid>
        </Stack>
    )
}

export default MediaCardsContainer;