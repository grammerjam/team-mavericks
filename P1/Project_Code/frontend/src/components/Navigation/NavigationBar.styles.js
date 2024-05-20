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
}));

export const NavBarMenuItemsContainer = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const NavBarLink = styled(Link)(({ theme }) => ({
  margin: "20px 0",
}));
