"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import styled from "styled-components";

export default function HeadBar(props: {
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const isUnderMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ flexGrow: 1 }} autoFocus>
      <AppBar position="fixed" sx={{ backgroundColor: "#000000", zIndex: 999999 }}>
        <StyledToolbar $isUnderMd={isUnderMd} sx={{ height: isUnderMd ? "56px" : "64px" }}>
          <Button
            sx={{ display: isUnderMd ? "block" : "none" }}
            onClick={() => {
              props.setIsSideBarOpen((b) => !b);
            }}
          >
            <MenuIcon />
          </Button>
          <Typography
            variant="h1"
            noWrap
            component="h1"
            sx={{
              fontSize: "1.25rem",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              DEVSTACKTREND
            </Link>
          </Typography>
          <SearchBar />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

const StyledToolbar = styled(Toolbar)<{ $isUnderMd: boolean }>`
  min-height: 0 !important;
  button {
    color: white;
    display: ${(p) => (p.$isUnderMd ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    min-width: 0;
    padding: 15px;
  }
`;
