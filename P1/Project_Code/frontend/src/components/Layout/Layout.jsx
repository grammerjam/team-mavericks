import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import { Grid } from "@mui/material";

export const Layout = () => {
  return (
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
