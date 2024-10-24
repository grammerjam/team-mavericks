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
  [`@media (min-width: 320px) and (max-width: 1439px)`]: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "0 25px 0 25px"
  },
  ['@media (max-width: 425px)']: {
    margin: "0",
    borderRadius:"0"
  }

}));

export const NavBarMenuItemsContainer = styled("div")(({ theme }) => ({

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
// Media queries
  [`@media (min-width: 426px) and (max-width: 1439px)`]: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    gap: "32px", // 32px gap for screens between 1439px and 426px
  },
  [`@media (max-width: 425px)`]: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px", // 20px gap for screens smaller than 426px
  },
}));

export const NavBarLink = styled(Link)(({ theme }) => ({
  margin: "20px 0",
}));



