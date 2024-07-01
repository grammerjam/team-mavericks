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
            <Box color={"white"} className="font-heading-L">Trending</Box>
{/*            <Stack direction={{ xs: 'column', sm: 'column', md: "row" }} spacing={3}>
                {
                    movies.slice(0, 4).map((movie, index) => (
                        <MediaCard key={index} movie={movie} type="trending"/>
                        )
                    )
                }
            </Stack>*/}
            <ThemeProvider theme={trendingTheme}>
                <div style={trendingTheme.root}>
                    <ImageList style={trendingTheme.ImageList} cols={2.5}>
                        {movies.slice(0, 4).map((movie, index) => (
                           <ImageListItem key={index}>
                                <MediaCard movie={movie} type="trending"/>
                           </ImageListItem> 
                        ))}
                    </ImageList>
                </div>
            </ThemeProvider>
            <Grid container spacing={{ sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box color={"white"} className="font-heading-L">Recommended for you</Box>
                </Grid>
                {
                    movies.slice(4, movies.length-1).map((movie, index) => (
                        <Grid item key={index}>
                            <MediaCard movie={movie} type="recommended"/>
                        </Grid>
                        )
                    )
                }
            </Grid>
        </Stack>
    )
}

export default MediaCardsContainer;