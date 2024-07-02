"use client";

import styled from "styled-components";
import React from "react";

const Footer = () => {
  return (
    <StyledFooter>
      <div>created by chosungho</div>
      <div>contact: seongho6022@naver.com</div>
      <a href="https://github.com/CSH111/trend-rank" target={"_blank"}>
        information
      </a>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: #f4f4f4; */
  padding: 3rem;
  font-size: 1.2rem;
  border-top: 0.5px solid #cfcfcf;
  color: #878787;
`;
