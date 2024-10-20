import {styled} from "@mui/material/styles";
import {Grid} from "@mui/material";

export const NavigationBarGridContainer = styled(Grid)`
    padding-top: 1rem;
    display: flex;
    justify-content: center;

    @media (max-width: 425px){
        padding-top: 0;
    }
`
