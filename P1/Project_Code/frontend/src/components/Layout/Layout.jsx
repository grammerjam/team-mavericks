import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationBar></NavigationBar>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "10141E", p: 3 }}>
        <SearchBar></SearchBar>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};
