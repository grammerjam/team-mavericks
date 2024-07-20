import { useContext, useEffect } from "react";
import { MoviesContext } from "../../context/Movies.context";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import MediaCard from "../Media_Cards/MediaCard";
import theme from "../../Theme.styles";

const MediaList = ({ categoryType, title }) => {
	const { movies, setFilteredCategory } = useContext(MoviesContext);
	const { filteredCategory } = useContext(MoviesContext);

	useEffect(() => {
		filterCategory();
	}, [movies]);

	const filterCategory = () => {
		const filtered = movies.filter((movie) => {
			if(movie.category){
				return movie.category.toLowerCase().includes(categoryType);
			}
		});

		setFilteredCategory(filtered);
	}

    return (
    	<ThemeProvider theme={theme}>
	        <div>
	            <Typography className="media-heading" style={{color: "white"}} variant="h1">{title}</Typography>
	            <div className="media-container">
		            <Grid container spacing= {4}>
		            	{
			            	filteredCategory.map((movie, index) => (
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
			            	))
		            	}
		            </Grid>
	            </div>
	        </div>
        </ThemeProvider>
    )
}

export default MediaList;