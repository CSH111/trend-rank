"use client";
import React, { useEffect, useState } from "react";
import RankList from "./RankList";
import { useQueryParams } from "../../../hooks";
import { styled } from "styled-components";
import { Button } from "@mui/material";

const RankLoader = (props: { rankData: { count: number; name: string; keywordId: number }[] }) => {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <Conatiner>
      <RankList rankData={props.rankData} />
      <StyledMuiBtn
        sx={{ fontSize: "1.6rem" }}
        variant="contained"
        onClick={() => {
          const page = Number(queryParams.get("page"));
          setQueryParams({ page: String(page + 1) }, true);
        }}
      >
        순위 더보기
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
  /* ${(p) => p.theme} */
`;
