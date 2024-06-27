"use client";

import { styled } from "styled-components";
import { LoadingIcon } from "../components";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Container>
      <LoadingIcon size={"3rem"} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
  width: 100%;
`;
