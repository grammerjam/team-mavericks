import { IconButton, Slider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { ControlsContainer, PlayerWrapper } from "./CustomMediaPlayer.styles";
import Screenfull from "screenfull";

const CustomMediaPlayer = (props) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const timeoutRef = useRef(null);

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

    const handleProgress = (state) => {
        setProgress(state.played);
    }

    const handleSeekChange = (_, newValue) => {
        setProgress(newValue);
        if(playerRef.current) {
            playerRef.current.seekTo(newValue);
        }
    }

    const handleFullscreen = () => {
        Screenfull.toggle(containerRef.current);
    };
    
    const handleMouseMove = () => {
        setControlsVisible(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
    };
    
    useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutRef.current);
    };
    }, []);


    return (
        <PlayerWrapper ref={containerRef}>
            <ReactPlayer 
                ref={playerRef}
                url={props.url}
                playing={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                volume={volume}
                muted={muted}
                onProgress={handleProgress}
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
            <ControlsContainer visible={controlsVisible}>
                <IconButton onClick={handlePlayPause} color="secondary">
                    {playing ? <PauseIcon sx={{fontSize: 32}}/> : <PlayArrowIcon sx={{fontSize: 32}}/>}
                </IconButton>
                <IconButton>
                    <Slider
                        value={progress}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleSeekChange}
                        color="secondary"
                        style={{ 
                            flexGrow: 1, 
                            marginLeft: '10px', 
                            width: '700px', 
                            marginRight: '10px' 
                        }}
                        aria-label="Progress slider"
                    />
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
                        style={{width: '100px'}}
                        color="secondary"
                        aria-label="Volume slider"
                    />
                </IconButton>
                <IconButton onClick={handleFullscreen} color="secondary" size="large">
                    <FullscreenIcon sx={{fontSize: 32}}/>
                </IconButton>
            </ControlsContainer>
        </PlayerWrapper>
    );

}

export default CustomMediaPlayer;