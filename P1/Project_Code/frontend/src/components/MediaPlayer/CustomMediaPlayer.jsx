import { IconButton, Slider } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseIcon from '@mui/icons-material/Pause';
import { ControlsContainer, PlayerWrapper } from "./CustomMediaPlayer.styles";

const CustomMediaPlayer = (props) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    const handleMuteToggle = () => {
        if(muted && volume === 0){
            setVolume(0.5);
        }
        if(!muted){
            setVolume(0);
        }
        setMuted(!muted);
    }

    const handleVolumeChange = (_, newValue) => {
        setVolume(newValue);
        newValue === 0 ? setMuted(true) : setMuted(false);
    }

    return (
        <PlayerWrapper>
            <ReactPlayer 
                url={props.url}
                playing={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                volume={volume}
                muted={muted}
                width={'100%'}
                height={'100%'}
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                        }
                    }
                }}
            />
            <ControlsContainer>
                <IconButton onClick={handlePlayPause} color="secondary">
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={handleMuteToggle} color="secondary">
                    {muted ? <VolumeOffIcon/> : <VolumeUpIcon />}
                </IconButton>
                <IconButton>
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        min={0}
                        max={1}
                        step={0.01}
                        style={{width: '100px', marginLeft: '10px'}}
                        color="secondary"
                        aria-label="Volume slider"
                    />
                </IconButton>
            </ControlsContainer>
        </PlayerWrapper>
    );

}

export default CustomMediaPlayer;