import ReactPlayer from "react-player";
import { PlayerWrapper } from "./CustomMediaPlayer.styles";

const CustomMediaPlayer = (props) => {

    return (
        <PlayerWrapper
            sx={{
                height: {
                    xs: '250px',
                    sm: '450px',
                    md: '550px'
                }
            }}
        >
            <ReactPlayer 
                url={props.url}
                width={'100%'}
                height={'100%'}
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 1,
                            modestbranding: 1,
                            rel: 0,
                        }
                    }
                }}
            />
        </PlayerWrapper>
    );

}

export default CustomMediaPlayer;