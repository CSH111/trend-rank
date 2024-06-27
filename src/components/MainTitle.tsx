"use client";

import { Typography } from "@mui/material";
import { styled } from "styled-components";

function MainTitle() {
  return (
    <Container>
      <Typography
        variant="h2"
        noWrap
        component="h2"
        sx={{
          fontSize: "2.4rem",
          // flexGrow: 1,
          // fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        DEVSTACKTREND
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  /* h2 {
    font-size: 2.4rem;
    font-weight: 900;
    font-family: monospace;
    letter-spacing: 0.3rem;
  } */
`;
export default MainTitle;
