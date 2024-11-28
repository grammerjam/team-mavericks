import { styled } from "@mui/material";

export const StyledIconButton = styled("div")`
`

export const PlayerWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-itmes: center;
    position: relative;
    width: 100%;
    max-width: 1060px;
    height: 550px;
    margin: 20px;
    box-shadow: 9px 4px 12px rgba(156, 39, 176, 1);
    
`

export const ControlsContainer = styled("div")`
    position: absolute;
    display: flex;
    bottom: 5px;
    left: 20px;
    z-index: 10;
    background: #000000c2;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 9px 4px 12px rgba(156, 39, 176, 1);
    transition: opacity 0.5s ease;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`