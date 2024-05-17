import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar.styles";

// Import MoviesRoute Context
import { MoviesContext } from "../../context/Movies.context";

export const SearchBar = () => {
  // Import MoviesRoute Context
  const { movies, filteredMovies, setFilteredMovies } =
    useContext(MoviesContext);

  // Let the user user the search input
  const [searchInput, setSearchInput] = useState("");

  const onHandleInputChange = (e) => {
    // Change value of searchInput to whatever the user wrote right now
    const inputVal = e.target.value;
    setSearchInput(inputVal);
  };

  // Run this effect whenever searchInput changes
  useEffect(() => {
    // Filter movies based on the input value
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setFilteredMovies(filtered);
  }, [searchInput]);

  // Run this effect whenever filteredMovies changes
  // DELETE THIS EFFECT ONCE MOVIES ARE SHOWN IN THE MEDIA CARDS
  useEffect(() => {
    console.log(filteredMovies);
  }, [filteredMovies]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon style={{ color: "white" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for movies of TV series"
        inputProps={{ "aria-label": "search" }}
        onChange={onHandleInputChange}
      />
    </Search>
  );
};
