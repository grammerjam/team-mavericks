import { useEffect, useState } from "react";
import CustomMediaPlayer from "../../components/MediaPlayer/CustomMediaPlayer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import { 
    PlayerWrapper, 
    NoVideoMsg, 
    MediaContainer,
    MediaInfoContainer,
    Title,
    ReleaseDate,
    Overview,
    Genres,
    Genre
} from "./WatchMediaContainer.styles";
import { Button } from "@mui/material";


const WatchMediaContainer = () => {
    const { id } = useParams();
    const { media_type } = useParams();
    const apiUrl = getApiUrl();
    const [videoUrl, setVideoUrl] = useState("");
    const [mediaData, setMediaData] = useState();
    const [backdropUrl, setBackdropUrl] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const basicImgUrl = "https://image.tmdb.org/t/p";
    const [playTrailer, setPlayTrailer] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            try{
                const media = await axios.get(`${apiUrl}/media/mediaItem`, {
                    params: {
                        mediaID: id,
                        category: media_type
                    }
                });
                setMediaData(media.data);
                const videos = media.data.videos.results;
                console.log(videos);
                console.log("mediaData:  ", media.data);
                const videoUrl = getVideoUrl(videos);
                setVideoUrl(videoUrl);
            }catch(error){
                console.error("Error fetching videos", error);
            }
        }
        fetchMedia();
    },[])

    useEffect(()=> {
        if(mediaData){
            setBackdropUrl(`${basicImgUrl}/original/${mediaData.backdrop_path}`);
        }
    },[mediaData]);

    const getVideoUrl = (videos) => {
        const officialTrailer = videos.find(video => video.type === 'Trailer' && video.name.toLowerCase().includes('official'));
        if(officialTrailer){
            return `https://www.youtube.com/watch?v=${officialTrailer.key}`
        }
        const firstTrailer = videos.find(video => video.type === 'Trailer');
        return firstTrailer ? `https://www.youtube.com/watch?v=${firstTrailer.key}` : null;
    }

    const handlePlayTrailer = () => {
        setPlayTrailer(!playTrailer);
    }

    return (
        <MediaContainer backdrop={backdropUrl}>
            {
                playTrailer && (
                    videoUrl ? (
                        <PlayerWrapper>
                            <CustomMediaPlayer url={videoUrl}/>
                        </PlayerWrapper>
                    ) : (
                        <NoVideoMsg color={'white'}>No trailer video found</NoVideoMsg>
                    )
                )
            }
            <MediaInfoContainer>
                <Title>{media_type === "movie" ? mediaData?.title : mediaData?.name}</Title>
                <ReleaseDate>
                    Release Date: {media_type === "movie" ? mediaData?.release_date : mediaData?.first_air_date}
                </ReleaseDate>
                <Genres>
                    {
                        (mediaData?.genres)?.map((genre) => (
                            <Genre>{genre.name}</Genre>
                        ))
                    }
                </Genres>
                <Overview>{mediaData?.overview}</Overview>
                <Button onClick={handlePlayTrailer} variant="contained" fullWidth >{playTrailer ? "Close Video" : "Play Trailer"}</Button>
            </MediaInfoContainer>
        </MediaContainer>
    );
}

export default WatchMediaContainer;