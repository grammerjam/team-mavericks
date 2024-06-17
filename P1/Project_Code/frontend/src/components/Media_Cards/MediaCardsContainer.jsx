import { useContext } from "react";
import MediaCard from "./MediaCard";
import { Box, Grid, Stack } from "@mui/material";
import { MoviesContext } from "../../context/Movies.context";

const MediaCardsContainer = () => {

    const { movies } = useContext(MoviesContext);

    return (
        <Stack spacing={10}>
            <Box color={"white"} className="TrendingCardContainer" style={{fontSize: "32px",
                fontWeight: 300}} >Trending</Box>
            <Stack direction="row" spacing={3}>
                {
                    movies.slice(0, 4).map((movie, index) => (
                        <MediaCard key={index} movie={movie} type="trending"/>
                        )
                    )
                }
            </Stack>
            <Grid container spacing={{ md: 2, lg: 3 }} columns={{ xs: 2, md: 3, lg: 4 }}>
                <Grid item xs={2} md={3} lg={4}>
                    <Box color={"white"} className="RecommendedMediaContainer" style={{fontSize: "32px",
                        fontWeight: 300}} >Recommended for you</Box>
                </Grid>
                {
                    movies.slice(4, movies.length-1).map((movie, index) => (
                        <Grid item key={index} xs={1} md={1} lg={1}>
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