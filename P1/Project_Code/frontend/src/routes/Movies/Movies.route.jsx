import { useContext, useEffect } from "react";
import { MoviesContext } from "../../context/Movies.context";
import { Grid } from "@mui/material";
import MediaCard from "../../components/Media_Cards/MediaCard";

export const Movies = () => {

	const { movies, setFilteredCategory } = useContext(MoviesContext);
	const { filteredCategory } = useContext(MoviesContext);

	useEffect(() => {
		filterCategory();
	}, [movies]);

	const filterCategory = () => {
		const filtered = movies.filter((movie) => {
			if(movie.category){
				return movie.category.toLowerCase().includes("movie");
			}
		});

		setFilteredCategory(filtered);
	}

    return (
        <div>
            <h1 style={{color:"white"}} >Movies</h1>
            <Grid container spacing={{ sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 3 }}>
            	{
	            	filteredCategory.map((movie, index) => (
	            		<Grid item key={index}>
	            			<MediaCard movie={movie} type="movie"/>
	            		</Grid>
	            	))
            	}
            </Grid>
        </div>
    )
}