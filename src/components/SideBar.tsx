"use client";

import { styled } from "styled-components";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const SideBar = (props: {
  isSideBarOpen: boolean;
  isUnderMd: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();
  const handleClickOverMenu: any = () => {
    props.setIsSideBarOpen(false);
  };
  return (
    <Sidebar
      hidden={props.isUnderMd && !props.isSideBarOpen}
      rootStyles={{
        // position: props.isUnderMd ? "fixed" : "relative",
        backgroundColor: "white",
        position: "fixed",
        height: "100%",
        [`.${sidebarClasses.container}`]: {
          [`.ps-menuitem-root.ps-active`]: {
            // borderTop: "0.5rem black solid",
            backgroundColor: "#d6d6d6",
            [`&:hover`]: {
              backgroundColor: "#d6d6d6",
            },
          },
          // backgroundColor: 'red',
        },
      }}
    >
      <Menu>
        <MenuItem
          component={<Link href={"/"} />}
          active={pathName === "/"}
          onClick={handleClickOverMenu}
        >
          HOME
        </MenuItem>
        <SubMenu label="트렌드 순위" defaultOpen={true}>
          <MenuItem
            component={<Link href={"/rank/all"} />}
            active={pathName === "/rank/all"}
            onClick={handleClickOverMenu}
          >
            종합 순위
          </MenuItem>
          <MenuItem
            component={<Link href={"/rank/front-end"} />}
            active={pathName === "/rank/front-end"}
            onClick={handleClickOverMenu}
          >
            프론트엔드 순위
          </MenuItem>
          <MenuItem
            component={<Link href={"/rank/back-end"} />}
            active={pathName === "/rank/back-end"}
            onClick={handleClickOverMenu}
          >
            백엔드 순위
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
  return <Container className="side-bar">SideBar</Container>;
};

export default SideBar;

const Container = styled.div`
  width: 20rem;
  background-color: #9d9d9d;
  height: 100vh;
`;
