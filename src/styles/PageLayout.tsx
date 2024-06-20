"use client";

import { HeadBar } from "@/components";
import React from "react";
import { styled } from "styled-components";

const PageLayout = (props: any) => {
  return (
    <Container>
      <HeadBar />
      {props.children}
    </Container>
  );
};
const Container = styled.div``;
export default PageLayout;
