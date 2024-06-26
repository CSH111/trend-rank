"use client";
import { createGlobalStyle } from "styled-components";

import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    font-size:62.5%;
    line-height:1.4;
  }
  .d-flex {
    display:flex;
  }
  * {
    box-sizing: border-box;
  }
  `;
