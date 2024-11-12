import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MediaCard from "../Media_Cards/MediaCard";
import { MediaContainer, StyledBox } from "../Media_Cards/MediaCardsContainer.styles";
import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";

const MediaList = ({ categoryType, title }) => {
	
	const apiUrl = getApiUrl();
	const [filteredCategory, setFilteredCategory ] = useState([]);

	const getMedia = async () => {
		try{
			const mediaItems = await axios.get(`${apiUrl}/media/trending`, {
				params: {category: categoryType}
			});
			setFilteredCategory(mediaItems.data.results);
		}catch(error){
			console.error("Error fetching media.", error);
		}
	}

	useEffect(()=> {
		getMedia();
	},[]);

    return (
		<div>
			<StyledBox color={"white"} className="font-heading-L media-heading">{title}</StyledBox>
			<MediaContainer>
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
			</MediaContainer>
		</div>
    )
}

export default MediaList;