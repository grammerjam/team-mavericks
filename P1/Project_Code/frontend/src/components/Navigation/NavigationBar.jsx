import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import GridViewIcon from "@mui/icons-material/GridView";
import { IconButton } from "@mui/material";
import React, { useState, useContext } from "react";
import {
  NavBarContainer,
  NavBarMenuItemsContainer,
  NavBarLink,
} from "./NavigationBar.styles.js";

import { UserContext } from "../../context/User.context.jsx";
import avatar from "../../assets/image-avatar.png";

export const NavigationBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const { user, logoutUser } = useContext(UserContext);

  const handleIconClick = (path) => {
    setActivePath(path);
  };

  const onClickLogoutUser = () => {
    logoutUser();
  };

  const iconStyle = (path) => ({
    color: activePath === path ? "#FFFFFF" : "#5A698F",
  });

  return (
    <NavBarContainer>
      <NavBarLink to="/" onClick={() => handleIconClick("/")}>
        <MovieIcon sx={{ color: "red", marginBottom: "20px" }} />
      </NavBarLink>
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
      {
        user
        ?
          (
            <IconButton aria-label="avatar" onClick={onClickLogoutUser}>
                <img src={avatar} alt="User Profile Picture Avatar" width={42} style={{border: "2px solid white", borderRadius: "50%"}} />
            </IconButton>
          )
        :
          (
            <AccountCircleIcon sx={{ color: "#5A698F", fontSize: 42 }} />
          )
      }
    </NavBarContainer>
  );
};
