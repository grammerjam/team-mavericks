import { useContext, useEffect }from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavigationBar } from "../Navigation/NavigationBar.jsx";
import { SearchBar } from "../Search/SearchBar.jsx";
import { Grid } from "@mui/material";

import { UserContext } from "../../context/User.context.jsx";

export const Layout = () => {

  // Redirection Hook
  const navigate = useNavigate();

  // Grab Global User Data
  const { user } = useContext(UserContext);

  // Redirect to Login Route if no user
  // useEffect(() => {
  //   if (!user)
  //   {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);


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
