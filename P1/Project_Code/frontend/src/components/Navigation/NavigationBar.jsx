import { useLocation } from "react-router-dom";
import React, { useState, useContext } from "react";
import SiteLogoIcon from "@mui/icons-material/Movie";
import HomeIcon from "../../assets/icon-nav-home.svg";
import ActiveHomeIcon from "../../assets/active-icon-nav-home.svg";
import MovieIcon from "../../assets/icon-nav-movies.svg";
import ActiveMovieIcon from "../../assets/active-icon-nav-movies.svg";
import TvIcon from "../../assets/icon-nav-tv-series.svg";
import ActiveTvIcon from "../../assets/active-icon-nav-tv-series.svg";
import BookmarkIcon from "../../assets/icon-nav-bookmark.svg";
import ActiveBookmarkIcon from "../../assets/active-icon-nav-bookmark.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import {
  NavBarContainer,
  NavBarMenuItemsContainer,
  NavBarLink,
} from "./NavigationBar.styles.js";
import { UserContext } from "../../context/User.context.jsx";
import avatar from "../../assets/image-avatar.png";
import useViewport from "../../services/useViewport.jsx";

export const NavigationBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { width } = useViewport();
  const { user, logoutUser } = useContext(UserContext);

  const isMobile = width <= 767;
  const isTablet = width >= 768 && width <= 1439;
  const isDesktop = width >= 1440;

  const handleIconClick = (path) => {
    setActivePath(path);
  };

  const onClickLogoutUser = () => {
    logoutUser();
  };

  return (
    <NavBarContainer>
      <NavBarLink to="/" onClick={() => handleIconClick("/")}>
        <SiteLogoIcon
          sx={{ color: "red", marginBottom: isDesktop ? "20px" : 0 }}
        />
      </NavBarLink>
      <NavBarMenuItemsContainer>
        <NavBarLink to="/" onClick={() => handleIconClick("/")}>
          <img src={activePath === "/" ? ActiveHomeIcon : HomeIcon} />
        </NavBarLink>
        <NavBarLink to="/movies" onClick={() => handleIconClick("/movies")}>
          <img src={activePath === "/movies" ? ActiveMovieIcon : MovieIcon} />
        </NavBarLink>
        <NavBarLink
          to="/tv-series"
          onClick={() => handleIconClick("/tv-series")}
        >
          <img src={activePath === "/tv-series" ? ActiveTvIcon : TvIcon} />
        </NavBarLink>
        <NavBarLink
          to="/bookmarks"
          onClick={() => handleIconClick("/bookmarks")}
        >
          <img
            src={
              activePath === "/bookmarks" ? ActiveBookmarkIcon : BookmarkIcon
            }
          />
        </NavBarLink>
      </NavBarMenuItemsContainer>
      {user ? (
        <IconButton
          aria-label="avatar"
          onClick={onClickLogoutUser}
          sx={{ paddingTop: isDesktop ? "6em" : 0 }}
        >
          <img
            src={avatar}
            alt="User Profile Picture Avatar"
            width={42}
            style={{ border: "2px solid white", borderRadius: "50%" }}
          />
        </IconButton>
      ) : (
        <AccountCircleIcon
          sx={{
            color: "#5A698F",
            fontSize: 42,
            paddingTop: isDesktop ? "4em" : 0,
          }}
        />
      )}
    </NavBarContainer>
  );
};
