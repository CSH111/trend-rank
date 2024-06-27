"use client";
import React, { useEffect, useState } from "react";
import RankList from "./RankList";
import { useQueryParams } from "../../../hooks";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import { LoadingIcon } from "@/components";

const RankLoader = (props: { rankData: { count: number; name: string; keywordId: number }[] }) => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [queryParams.get("page")]);

  return (
    <Conatiner>
      <RankList rankData={props.rankData} />
      <StyledMuiBtn
        sx={{ fontSize: "1.6rem" }}
        variant="contained"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          const page = Number(queryParams.get("page"));
          setQueryParams({ page: String(page + 1) }, true);
        }}
      >
        {isLoading ? (
          <>
            <LoadingIcon color="white" />
          </>
        ) : (
          <>순위 더보기</>
        )}
      </StyledMuiBtn>
    </Conatiner>
  );
};

export default RankLoader;

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const StyledMuiBtn = styled(Button)`
  align-self: center;
  background-color: #000000 !important;
  width: 100%;
  height: 4rem;
  &:hover {
    background-color: #383838 !important;
  }
`;
