import { IconButton } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const CustomMediaPlayer = (props) => {
    const [playing, setPlaying] = useState(false);

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    return (
        <div style={{ maxWidth: '1040px', height: '550px', margin: 'auto' }}>
            <ReactPlayer 
                url={props.url}
                playing={playing}
                width={'100%'}
                height={'100%'}
                config={{
                    youtube: {
                        playerVars: {
                            showinfo: 1,
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                        }
                    }
                }}
            />
            <IconButton onClick={handlePlayPause} color="primary">
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
        </div>
    );

}

export default CustomMediaPlayer;