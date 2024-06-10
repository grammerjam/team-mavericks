import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const NavBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "625px",
  flexDirection: "column",
  alignItems: "center",
  width: "96px",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  background: "#161D2F",
  borderRadius: "20px",
// Media queries
  [`@media (min-width: 769px) and (max-width: 1279px)`]: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

export const NavBarMenuItemsContainer = styled("div")(({ theme }) => ({

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // Media queries
  [`@media (min-width: 769px) and (max-width: 1279px)`]: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

export const NavBarLink = styled(Link)(({ theme }) => ({
  margin: "20px 0",
}));
