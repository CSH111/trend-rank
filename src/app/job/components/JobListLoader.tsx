"use client";

import { getJob } from "@/serverActions";
import { Button } from "@mui/material";
import React from "react";
import { styled } from "styled-components";
import { useQueryParams } from "../../../hooks";
import JobList from "./JobList";

const JobListLoader = (props: { jobData: Awaited<ReturnType<typeof getJob>> }) => {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <Container>
      <JobList jobData={props.jobData} />
      <StyledMuiBtn
        sx={{ fontSize: "1.6rem" }}
        variant="contained"
        onClick={() => {
          const page = Number(queryParams.get("page"));
          setQueryParams({ page: String(page + 1) }, true);
        }}
      >
        공고 더보기
      </StyledMuiBtn>
    </Container>
  );
};

export default JobListLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 1rem;
`;

const StyledMuiBtn = styled(Button)`
  align-self: center;
  /* ${(p) => p.theme} */
`;
