"use client";
import React, { useEffect, useState } from "react";
import RankList from "./RankList";
import { useQueryParams } from "../../../hooks";

const RankLoader = (props: {
  groupId: number[];
  rankData: { count: number; name: string; keywordId: number }[];
}) => {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <div>
      <RankList rankData={props.rankData} />
      <button
        onClick={() => {
          const page = Number(queryParams.get("page"));
          setQueryParams({ page: String(page + 1) }, true);
        }}
      >
        추가로드
      </button>
    </div>
  );
};

export default RankLoader;
