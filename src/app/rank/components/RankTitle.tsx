"use client";

import React from "react";
import { styled } from "styled-components";

const RankTitle = (props: { title: string }) => {
  return (
    <Container>
      <h3>{props.title}</h3>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    font-weight: bold;
    font-size: 2.5rem;
    color: #000000;
  }
`;
export default RankTitle;
