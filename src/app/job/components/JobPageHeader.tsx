"use client";

import { ImageComp } from "@/app/rank/components";
import React from "react";
import { styled } from "styled-components";

const JobPageHeader = (props: { refind_keyword_name: string }) => {
  const imageServerURL = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || process.env.IMAGE_SERVER_URL;

  return (
    <Container>
      <ImageComp
        width={40}
        height={40}
        alt="tech_img"
        src={`${imageServerURL}/images/tech/${props.refind_keyword_name
          ?.replaceAll(" ", "-")
          ?.replaceAll("/", "-")}.png`}
      />
      <h3>{props.refind_keyword_name}</h3>
    </Container>
  );
};

export default JobPageHeader;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 2.5rem;
    font-weight: bold;
  }
`;
