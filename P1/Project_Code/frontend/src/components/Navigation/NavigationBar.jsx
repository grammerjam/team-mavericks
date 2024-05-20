import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import GridViewIcon from "@mui/icons-material/GridView";
import { Drawer } from "@mui/material";
import React, { useState } from "react";

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
    <div
      className="NavigationContainer"
      style={{
        display: "flex",
        height: "625px",
        flexDirection: "column",
        alignItems: "center",
        width: "96px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        background: "#161D2F",
        borderRadius: "20px",
      }}
    >
      <div className="MovieIconContainer" style={{ marginBottom: "20px" }}>
        <MovieIcon sx={{ color: "red" }} />
      </div>
      <div
        className="NavigationMenuItemsContainer"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ margin: "20px 0" }}
          onClick={() => handleIconClick("/")}
        >
          <GridViewIcon sx={iconStyle("/")} />
        </Link>
        <Link
          to="/movies"
          style={{ margin: "20px 0" }}
          onClick={() => handleIconClick("/movies")}
        >
          <LocalMoviesIcon sx={iconStyle("/movies")} />
        </Link>
        <Link
          to="/bookmarks"
          style={{ margin: "20px 0" }}
          onClick={() => handleIconClick("/bookmarks")}
        >
          <BookmarkIcon sx={iconStyle("/bookmarks")} />
        </Link>
        <Link
          to="/tv-series"
          style={{ margin: "20px 0" }}
          onClick={() => handleIconClick("/tv-series")}
        >
          <TvIcon sx={iconStyle("/tv-series")} />
        </Link>
      </div>
      <div
        className="ProfileIconContainer"
        style={{ marginBottom: "20px", paddingTop: "100px" }}
      >
        <AccountCircleIcon sx={{ color: "#5A698F" }} />
      </div>
    </div>
  );
};

// <Drawer
//     sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             display: "flex",
//             flexDirection: "column",
//             backgroundColor: "#161D2F",
//         },
//     }}
//     variant="permanent"
//     anchor="left"
// >
// </Drawer>
