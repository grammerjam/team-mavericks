import {styled} from "@mui/material/styles";

export const BookmarkImage = styled("img")`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
`

export const CardContainer = styled("div")`
    border-radius: 20px;
    width: 470px;
    height: 230px;
    left: 0px;
    top: 65px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        border-radius: 20px;
        width: 100%;
        height: 100%;
        background-image: ${({ imgSrc }) => `url(${imgSrc})`};
        background-size: cover;
        background-position: center;
        transition: filter 0.3s ease;
    }

    &:hover::before {
        filter: brightness(50%);
    }

    &:hover .play-button{
        opacity: 1;
    }
`

export const PlayButton = styled("div")`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`

