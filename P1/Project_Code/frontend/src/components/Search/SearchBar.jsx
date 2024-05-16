import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    width: '100%',
    marginLeft: "50px",
    caretColor: "rgb(252, 71, 71)",
    '&:hover': {
        border: "none",
        borderBottom: "1px solid rgb(90, 105, 143)"
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const SearchBar = () => {

    return (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon style={{color: "white"}} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for movies of TV series"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
    )
}