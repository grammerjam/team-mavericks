import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

import { Search, StyledInputBase } from "./SearchBar.styles";

// Import MoviesRoute Context
import { MoviesContext } from "../../context/Movies.context";

export const SearchBar = () => {
  // Import MoviesRoute Context
  const { movies, setFilteredMovies } = useContext(MoviesContext);

  // Import Navigation Handler
  const navigate = useNavigate();

  // Let the user user the search input
  const [searchInput, setSearchInput] = useState("");

  const onHandleInputChange = (e) => {
    // Change value of searchInput to whatever the user wrote right now
    const inputVal = e.target.value;
    setSearchInput(inputVal);
  };

  const goToSearchResults = () => {
    navigate("/search");
  };

  const onHandleSearchButtonClick = () => {
    filterMovies();
    goToSearchResults();
  };

  const onHandleKeyDownPress = (e) => {
    // Detect that the Enter key was pressed
    if (e.key === 'Enter' || e.keyCode === 13)
      {
        filterMovies();
        goToSearchResults();
      }
  };

  const filterMovies = () => {
        // Filter movies based on the input value
        const filtered = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchInput.toLowerCase()),
        );

        if (filtered.length ==  0)
        {
            setFilteredMovies([]);
        }

        else
        {
          setFilteredMovies(filtered);
        }
  }

  return (
    <Search>
        <IconButton aria-label="search" style={{ position: "relative", top: "50px"}} onClick={onHandleSearchButtonClick}>
          <SearchIcon style={{ color: "white"}}/>
        </IconButton >
      <StyledInputBase
        placeholder="Search for movies of TV series"
        inputProps={{ "aria-label": "search" }}
        onChange={onHandleInputChange}
        onKeyDown={onHandleKeyDownPress}
      />
    </Search>
  );
};
