"use client";
import { LoadingIcon } from "@/components";
import React, { useState } from "react";
import { styled } from "styled-components";

function useLoadingCover() {
  const [isLoading, setIsLoading] = useState(false);
  const LoadingCoverComp = () => {
    return (
      <Container>
        <LoadingIcon className="loading-icon" />
      </Container>
    );
  };

  return { LoadingCoverComp, isLoading, setIsLoading };
}

export default useLoadingCover;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #00000079;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .loading-icon {
  }
`;
