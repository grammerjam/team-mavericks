import { useContext } from "react";
import { Grid, Box } from "@mui/material";
import { MoviesContext } from "../../context/Movies.context";
import MediaCard from "../../components/Media_Cards/MediaCard";
import { MediaContainer, StyledBox } from "../../components/Media_Cards/MediaCardsContainer.styles";

export const SearchResults = () => {

    // Grab the filtered movies
    const { filteredMovies } = useContext(MoviesContext);

    // Show movies searched in case there were any
    if (filteredMovies.length > 0)
    {
        return (
            <div>
                <StyledBox color={"white"} className="font-heading-L media-heading">Search Results</StyledBox>
                <MediaContainer>
                    <Grid container spacing= {4}>
                        {
                            filteredMovies.map((movie, index) => (
                                <Grid 
                                    item key={index}
                                    xs={6}
                                    sm={4}
                                    md={4}
                                    lg={3}
                                    xl={2.4}
                                >
                                    <MediaCard movie={movie} type="searched"/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </MediaContainer>
            </div>
        )   
    }

    // If no movies were filtered, display "No Results Found" message
    else
    {
        return (
            <Box color={"white"} className="font-heading-L">No Results Found</Box>
        );
    }
}