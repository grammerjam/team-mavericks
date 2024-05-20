import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

export const Layout = () => {
  return (
    // part 1: page that is a grid container
    // contains a horizontal stack for search bar
    // grid container for media container
    // part 2: vertical stack for nav bar
    <Grid container spacing={0}>
      <Grid
        item
        xs={1}
        container
        justifyContent="center"
        style={{ paddingTop: "1rem" }}
      >
        <NavigationBar></NavigationBar>
      </Grid>
      <Grid item xs={11}>
        <SearchBar></SearchBar>
        <div style={{ visibility: "hidden", padding: "10px" }}>xd</div>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};
