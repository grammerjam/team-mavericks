import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import GridViewIcon from "@mui/icons-material/GridView";
import { Drawer } from "@mui/material";
import React from "react";

export const NavigationBar = () => {
  const drawerWidth = 75;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#161D2F",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div
        className="NavigationContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "1rem",
          paddingBottom: "1rem",
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
          <Link to="/" style={{ margin: "20px 0" }}>
            <GridViewIcon sx={{ color: "#5A698F" }} />
          </Link>
          <Link to="/movies" style={{ margin: "20px 0" }}>
            <LocalMoviesIcon sx={{ color: "#5A698F" }} />
          </Link>
          <Link to="/bookmarks" style={{ margin: "20px 0" }}>
            <BookmarkIcon sx={{ color: "#5A698F" }} />
          </Link>
          <Link to="/tv-series" style={{ margin: "20px 0" }}>
            <TvIcon sx={{ color: "#5A698F" }} />
          </Link>
        </div>
        <div
          className="ProfileIconContainer"
          style={{ marginBottom: "20px", paddingTop: "100px" }}
        >
          <AccountCircleIcon sx={{ color: "#5A698F" }} />;
        </div>
      </div>
    </Drawer>
  );
};
