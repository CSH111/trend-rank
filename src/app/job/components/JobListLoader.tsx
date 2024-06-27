"use client";

import { LoadingIcon } from "@/components";
import usePortal from "@/hooks/usePortal";
import { getJob } from "@/serverActions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLoadingCover, useQueryParams } from "../../../hooks";
import JobList from "./JobList";

const JobListLoader = (props: { jobData: Awaited<ReturnType<typeof getJob>> }) => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [queryParams.get("page")]);

  return (
    <Container>
      <JobList jobData={props.jobData} />
      <StyledMuiBtn
        sx={{ fontSize: "1.6rem" }}
        variant="contained"
        disabled={isLoading}
        onClick={() => {
          const page = Number(queryParams.get("page"));
          setIsLoading(true);
          setQueryParams({ page: String(page + 1) }, true);
        }}
      >
        {isLoading ? (
          <>
            <LoadingIcon color="white" />
          </>
        ) : (
          <>공고 더보기</>
        )}
      </StyledMuiBtn>
    </Container>
  );
};

export default JobListLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .loading-box {
    .loading-icon {
    }
  }
`;

const StyledMuiBtn = styled(Button)`
  align-self: center;
  background-color: #000000 !important;
  /* ${(p) => p.theme} */
  width: 100%;
  height: 4rem;

  &:hover {
    background-color: #383838 !important;
  }
`;
