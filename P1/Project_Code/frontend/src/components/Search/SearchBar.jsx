import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import { Search, StyledInputBase } from "./SearchBar.styles";
import { MoviesContext } from "../../context/Movies.context";

export const SearchBar = () => {
  // Import MoviesRoute Context
  const { setFilteredMovies, loading, setLoading } = useContext(MoviesContext);

  // Import Navigation Handler
  const navigate = useNavigate();

  const location = useLocation();

  // Let the user user the search input
  const [searchInput, setSearchInput] = useState("");

  const apiUrl = getApiUrl();

  useEffect(() => {
    if(location.pathname !== '/search'){
      setSearchInput('');
    }
  }, [location]);

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
    if (e.key === "Enter" || e.keyCode === 13) {
      filterMovies();
      goToSearchResults();
    }
  };

  const filterMovies = async () => {
    // Filter movies based on the input value
    const trimmedInput = searchInput.trim();
    setLoading(true);
    try{
      if (trimmedInput.length > 0) {
        const movies = await axios(`${apiUrl}/media/search`, {
          params: {
            query: trimmedInput
          }
        });

        setFilteredMovies(movies.data.results);
      } else {
        setFilteredMovies([]);
      }
    }catch(err){
      console.log('Error', err);
      if(err.response){
          console.error("Response error data", err.response.data);
          console.error("Response error status", err.response.status);      
      }
    }finally{
      setLoading(false);
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
