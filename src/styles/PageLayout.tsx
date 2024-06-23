"use client";

import { HeadBar } from "@/components";
import SideBar from "@/components/SideBar";
import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const PageLayout = (props: any) => {
  const theme = useTheme();
  const isUnderMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    if (isUnderMd) {
      setIsSideBarOpen(false);
    }
  }, [isUnderMd]);

  return (
    <Container isUnderMd={isUnderMd} isSideBarOpen={isSideBarOpen}>
      <HeadBar setIsSideBarOpen={setIsSideBarOpen} />
      <div className="main-and-side-bar">
        <SideBar
          isUnderMd={isUnderMd}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div className="main-cover" onClick={() => setIsSideBarOpen(false)} />
        <main>{props.children}</main>
      </div>
    </Container>
  );
};
const Container = styled.div<{ isUnderMd: boolean; isSideBarOpen: boolean }>`
  .main-and-side-bar {
    margin-top: 64px;
    display: flex;
    .aside {
    }
    .ps-sidebar-container {
      ${(p) => {
        if (p.isUnderMd) {
          return `
          height: 100%;
          `;
        }
        return ``;
      }}
    }
    .main-cover {
      display: ${(p) => (p.isUnderMd && p.isSideBarOpen ? "initial" : "none")};
      width: 100%;
      height: 100%;
      position: fixed;
      background-color: #00000089;
      margin-left: 250px;
      z-index: 9999;
    }
    main {
      flex: 1;
      margin-left: ${(p) => (p.isUnderMd ? "0px" : "250px")};
    }
  }
`;
export default PageLayout;
