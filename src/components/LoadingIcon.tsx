"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { styled } from "styled-components";

const LoadingIcon = (props: { className?: string; size?: string | number; color?: string }) => {
  return (
    <Container
      className={props.className}
      color={props.color ?? "black"}
      size={props?.size ?? "2rem"}
    />
  );
};

export default LoadingIcon;

const Container = styled(AiOutlineLoading3Quarters)`
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
