import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import { Grid } from "@mui/material";
import { NavigationBarGridContainer } from "./Layout.styles.js";
import useViewport from "../../services/useViewport.jsx";
export const Layout = () => {
    const { width } = useViewport();

    const isMobile = width <= 767;
    const isTablet = width >= 768 && width <= 1439;
    const isDesktop = width >= 1440;

  return (
    <Grid container spacing={0}>
      <NavigationBarGridContainer item xs={isMobile || isTablet ? 0 : 1} container justifyContent="center">
        <NavigationBar></NavigationBar>
      </NavigationBarGridContainer>
      <Grid item xs={11}>
        <SearchBar></SearchBar>
        <div style={{ visibility: "hidden", padding: "10px" }}>xd</div>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};
