import {styled} from "@mui/material/styles";

export const BookmarkImage = styled("img")`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
`

export const TrendingContainer = styled("div")`
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

    @media (min-width: 769px){
        &:hover::before {
            filter: brightness(50%);
        }

        &:hover .play-button{
            opacity: 1;
        }
    }

    @media (max-width: 767px){
        width: 240px;
        height: 140px;
    }
    
    @media(min-width: 426px) and (max-width: 1439px){
        padding-left: 20px;
    }

    @media (max-width: 425px){
        padding-left: 10px;
    }
`

export const PlayButton = styled("div")`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 117px;
    height: 48px;
    border-radius: 28.5px;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
    background: #97979770;
`
export const PlayButtonImg = styled("div")`
    position: relative;
    left: 7.69%;
    right: 66.67%;
    top: 18.75%;
    bottom: 18.75%;
    width: 25%;
`

export const PlayText = styled("h4")`
    position: relative;
    height: 23px;
    left: 49.57%;
    right: 20.51%;
    top: calc(50% - 70px/1 - -0.5px);
    max-width: 70px;
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
`
export const RecommendedContainer = styled("div")`
    position: relative;
    cursor: pointer;
    display: flex;

    img {
        border-radius: 20px;
        width: 100%;
        height: auto;
        max-width: 100%;
        transition: filter 0.3s ease;
    }

    .bookmark-icon{
        position: absolute;
        top: 15px;
        right: 15px;
        width: 32px;
        height: 32px;
        z-index: 10;
    }

    @media (min-width: 769px){
        &:hover img:not(.bookmark-icon, .play-button-img) {
            filter: brightness(50%);
        }

        &:hover .play-button{
            opacity: 1;
        }
    }
`

export const BlankWrapper = styled("div")`
    width: 100%;
    height: 100%;
    position: absolute;
`


