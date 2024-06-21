"use client";
import { createGlobalStyle } from "styled-components";

import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    font-size:62.5%;
  }
  .d-flex {
    display:flex;
  }
  `;
