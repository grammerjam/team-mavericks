import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("rgb(16, 20, 30)", 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    width: '100%',
    marginLeft: "50px",
    fontSize: "24px",
    fontWeight: "300",
    fontFamily: "Outfit",
    caretColor: "rgb(252, 71, 71)",
    '&:hover': {
        border: "none",
        borderBottom: "1px solid rgb(90, 105, 143)"
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
    },
}));
