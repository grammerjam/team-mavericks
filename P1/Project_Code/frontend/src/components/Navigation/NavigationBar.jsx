import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import GridViewIcon from "@mui/icons-material/GridView";
import React, { useState } from "react";
import {
  NavBarContainer,
  NavBarMenuItemsContainer,
  NavBarLink,
} from "./NavigationBar.styles.js";

export const NavigationBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleIconClick = (path) => {
    setActivePath(path);
  };

  const iconStyle = (path) => ({
    color: activePath === path ? "#FFFFFF" : "#5A698F",
  });

  return (
    <NavBarContainer>
      <MovieIcon sx={{ color: "red", marginBottom: "20px" }} />
      <NavBarMenuItemsContainer>
        <NavBarLink to="/" onClick={() => handleIconClick("/")}>
          <GridViewIcon sx={iconStyle("/")} />
        </NavBarLink>
        <NavBarLink to="/movies" onClick={() => handleIconClick("/movies")}>
          <LocalMoviesIcon sx={iconStyle("/movies")} />
        </NavBarLink>
        <NavBarLink
          to="/bookmarks"
          onClick={() => handleIconClick("/bookmarks")}
        >
          <BookmarkIcon sx={iconStyle("/bookmarks")} />
        </NavBarLink>
        <NavBarLink
          to="/tv-series"
          onClick={() => handleIconClick("/tv-series")}
        >
          <TvIcon sx={iconStyle("/tv-series")} />
        </NavBarLink>
      </NavBarMenuItemsContainer>
      <AccountCircleIcon sx={{ color: "#5A698F" }} />
    </NavBarContainer>
  );
};
