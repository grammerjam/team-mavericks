import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const location = useLocation();

  // Let the user user the search input
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if(location.pathname !== '/search'){
      setSearchInput('');
    }
  }, [location]);

  const onHandleInputChange = (e) => {
    // Change value of searchInput to whatever the user wrote right now
    const inputVal = e.target.value;
    const trimmedVal = inputVal.trim();
    setSearchInput(trimmedVal);
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
    if (e.key === "Enter" || e.keyCode === 13) {
      filterMovies();
      goToSearchResults();
    }
  };

  const filterMovies = () => {
    // Filter movies based on the input value
    if (searchInput.length > 0) {
      const filtered = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchInput.toLowerCase());
      });

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  };

  return (
    <Search>
      <IconButton
        aria-label="search"
        style={{ position: "relative", top: "50px" }}
        onClick={onHandleSearchButtonClick}
      >
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
      <StyledInputBase
        placeholder="Search for movies or TV series"
        inputProps={{ "aria-label": "search" }}
        value={searchInput}
        onChange={onHandleInputChange}
        onKeyDown={onHandleKeyDownPress}
      />
    </Search>
  );
};
