import { useEffect, useRef, useState } from "react";
import CustomMediaPlayer from "../../components/MediaPlayer/CustomMediaPlayer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import { 
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
import { ThemeProvider } from "@emotion/react";
import theme from "../../Theme.styles";


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
    const mediaContainerRef = useRef(null);

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

    const scrollToMedia = () => {
        if(mediaContainerRef.current){
            mediaContainerRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <MediaContainer ref={mediaContainerRef} backdrop={backdropUrl}>
                {
                    playTrailer && (
                        videoUrl ? (
                            <CustomMediaPlayer url={videoUrl}/>
                        ) : (
                            <NoVideoMsg color={'white'}>No trailer video found</NoVideoMsg>
                        )
                    )
                }
                <MediaInfoContainer 
                    sx={{
                        margin: {
                            xs: "0", 
                            md: "90px 0 20px 60px"
                        },
                        borderRadius: {
                            xs: "0",
                            md: "15px"
                        }
                    }}
                >
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
                    <Button 
                        onClick={() => {
                            scrollToMedia();
                            handlePlayTrailer();
                        }}
                        variant="contained"
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'auto'
                            }
                        }}
                    >
                        {playTrailer ? "Close Video" : "Play Trailer"}
                    </Button>
                    <Overview>{mediaData?.overview}</Overview>
                </MediaInfoContainer>
            </MediaContainer>
        </ThemeProvider>
    );
}

export default WatchMediaContainer;