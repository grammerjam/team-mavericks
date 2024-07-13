import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import { Grid } from "@mui/material";
import { NavigationBarGridContainer } from "./Layout.styles.js";
export const Layout = () => {


  return (
    <Grid container spacing={0}>
      <NavigationBarGridContainer item sm={0} md={0} lg={1} container justifyContent="center">
        <NavigationBar></NavigationBar>
      </NavigationBarGridContainer>
      <Grid item xs={12} md={12} lg={11}>
        <SearchBar></SearchBar>
        <div style={{ visibility: "hidden", padding: "10px" }}>xd</div>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};
