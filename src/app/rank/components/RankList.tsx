"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ImageComp from "./ImageComp";

const RankList = (props: { rankData: { count: number; name: string; keywordId: number }[] }) => {
  const imageServerURL = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;
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
            <ImageComp
              width={50}
              height={50}
              alt="tech_img"
              src={`${imageServerURL}/images/tech/${rd.name
                .replaceAll(" ", "-")
                .replaceAll("/", "-")}.png`}
            />

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
