import { useContext, useEffect } from "react";
import { MoviesContext } from "../../context/Movies.context";
import { Grid, ThemeProvider, Typography, Box } from "@mui/material";
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
		<div>
			<Box color={"white"} className="font-heading-L media-heading">{title}</Box>
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
    )
}

export default MediaList;