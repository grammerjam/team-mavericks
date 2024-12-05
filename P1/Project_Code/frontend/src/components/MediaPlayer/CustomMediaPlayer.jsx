import { Box, IconButton, Slider } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { BottomControllers, ControlsContainer, PlayerWrapper, ShowControlsButton, TopControllers } from "./CustomMediaPlayer.styles";
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
        return () => {
          clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <PlayerWrapper 
            onMouseMove={handleMouseMove} 
            ref={containerRef}
            sx={{
                height: {
                    xs: '350px',
                    sm: '550px'
                }
            }}
        >
            <ReactPlayer 
                ref={playerRef}
                url={props.url}
                playing={playing}
                onPlay={() => {
                    setPlaying(true)
                    handleMouseMove();
                }}
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
            <ControlsContainer 
                visible={controlsVisible}
                sx={{
                    width: {
                        xs: '100%',
                        sm: 'calc(100% - 70px)'
                    }
                }}
            >
                <TopControllers>
                    <Box display="flex" alignItems="center" width="100%">
                        <Slider
                            value={progress}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={handleSeekChange}
                            color="secondary"
                            sx={{ 
                                flexGrow: 1, 
                                marginLeft: '10px',
                                marginRight: '10px',
                            }}
                            aria-label="Progress slider"
                        />
                    </Box>
                </TopControllers>
                <BottomControllers>
                    <Box>
                        <IconButton onClick={handlePlayPause} color="secondary">
                            {playing ? 
                                <PauseIcon 
                                    sx={{
                                        fontSize: {
                                            xs: '48px',
                                            sm: '32px'
                                        }
                                    }}
                                /> 
                                : 
                                <PlayArrowIcon 
                                    sx={{
                                        fontSize: {
                                            xs: '48px',
                                            sm: '32px'
                                        }
                                    }}
                                />
                            }
                        </IconButton>
                        <IconButton 
                            onClick={handleMuteToggle} 
                            color="secondary"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'inline'
                                }
                            }}
                        >
                            {muted ? <VolumeOffIcon/> : <VolumeUpIcon />}
                        </IconButton>
                        <IconButton 
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'inline'
                                }
                            }}
                        >
                            <Slider
                                value={volume}
                                onChange={handleVolumeChange}
                                min={0}
                                max={1}
                                step={0.01}
                                style={{width: '25vw', maxWidth: '130px', minWidth: '25px'}}
                                color="secondary"
                                aria-label="Volume slider"
                            />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton onClick={handleFullscreen} color="secondary" size="large">
                            <FullscreenIcon sx={{fontSize: 32}}/>
                        </IconButton>
                    </Box>
                </BottomControllers>
            </ControlsContainer>
            {!controlsVisible && (<ShowControlsButton onClick={handleMouseMove}>Show Controls</ShowControlsButton>)}
        </PlayerWrapper>
    );

}

export default CustomMediaPlayer;