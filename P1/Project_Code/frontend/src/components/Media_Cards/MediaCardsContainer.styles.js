import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const BookmarkImage = styled("img")`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
`

export const StyledBox = styled(Box)`
    @media (max-width: 1439px){
        margin-left: 25px !important;
    }
    
    @media (max-width: 435px){
        margin-left: 15px !important;
    }
`

export const MediaContainer = styled("div")`
    margin-top: 80px;

    @media (min-width: 426px) and (max-width: 1439px){
        padding: 0 25px 0 25px;
    }

    @media (max-width: 425px){
        padding: 0 15px 0 15px;
    }
`