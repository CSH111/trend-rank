"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { SearchForm } from "./SearchForm";
import HorizontalSearchBox from "./SearchForm/HorizontalSearchBox";

export default function HeadBar(props: {
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Box sx={{ flexGrow: 1 }} autoFocus>
      <AppBar position="fixed" color="success">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
            onClick={() => {
              props.setIsSideBarOpen((b) => !b);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h1"
            noWrap
            component="h1"
            sx={{
              fontSize: "1.25rem",
              flexGrow: 1,
              // display: { xs: "none", sm: "block" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
            // sx={{
            //   cursor: "pointer",
            //   mr: 2,
            //   display: { xs: "none", md: "flex" },
            //   fontFamily: "monospace",
            //   fontWeight: 700,
            //   letterSpacing: ".3rem",
            //   color: "inherit",
            //   textDecoration: "none",
            // }}
          >
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              DEVSTACKTREND
            </Link>
          </Typography>
          <HorizontalSearchBox>
            <SearchForm />
          </HorizontalSearchBox>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
