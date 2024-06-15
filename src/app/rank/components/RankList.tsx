"use client";

import { useRouter } from "next/navigation";
import React from "react";

const RankList = (props: { rankData: { count: number; name: string; keywordId: number }[] }) => {
  const router = useRouter();
  if (!props.rankData || !props.rankData.length || !props.rankData[0]) {
    return <></>;
  }
  return (
    <ul>
      {props.rankData?.map((rd, idx) => {
        return (
          <li key={rd.name} onClick={() => router.push(`/job/${rd.keywordId}`)}>
            <hr />
            <div>{idx + 1}</div>
            <div>{rd.count}</div>
            <div>{rd.name}</div>
            <hr />
          </li>
        );
      })}
    </ul>
  );
};

// const RankItem = () => {

// }

export default RankList;
