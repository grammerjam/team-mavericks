import { useContext } from "react";
import { Grid } from "@mui/material";
import { MoviesContext } from "../../context/Movies.context";
import MediaCard from "../../components/Media_Cards/MediaCard";

export const SearchResults = () => {

    // Grab the filtered movies
    const { filteredMovies } = useContext(MoviesContext);

    return (
        <Grid container spacing={{ sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 3 }}>
            {
                filteredMovies.map((movie, index) => (
                    <Grid item key={index}>
                        <MediaCard movie={movie} type="searched"/>
                    </Grid>
                ))
            }
        </Grid>
    )
}