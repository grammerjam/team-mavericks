import { useContext } from "react";
import MediaCard from "./MediaCard";
import { Box, Grid, Stack } from "@mui/material";
import { MoviesContext } from "../../context/Movies.context";

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