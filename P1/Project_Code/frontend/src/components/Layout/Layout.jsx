import { useContext, useEffect }from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import {Grid, ThemeProvider} from "@mui/material";
import AppLayoutTheme from "../../services/AppLayoutTheme.jsx";
import { UserContext } from "../../context/User.context.jsx";
import {NavigationBarGridContainer} from "./Layout.styles.js";

export const Layout = () => {

  // Redirection Hook
  const navigate = useNavigate();

  // Grab Global User Data
  const { user } = useContext(UserContext);

  // Redirect to Login Route if no user
  useEffect(() => {
    if (!user)
    {
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <Grid container spacing={0}>
        <ThemeProvider theme={AppLayoutTheme}>
            <NavigationBarGridContainer item xs={0} md={0} lg={1} container justifyContent="center">
                <NavigationBar></NavigationBar>
            </NavigationBarGridContainer>
        </ThemeProvider>

      <Grid item xs={12} md={12} lg={11}>
        <SearchBar></SearchBar>
        <div style={{ visibility: "hidden", padding: "10px" }}>xd</div>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};
