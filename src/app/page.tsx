import { MainRanks } from "@/components";
import { getRank } from "@/serverActions";
import Image from "next/image";
import styled from "styled-components";
import { pr } from "../../PrismaClient";
import Comp from "../styles/Comp1";
import { RankList } from "./rank/components";

export default async function Home() {
  const result = await pr.keyword_groups.findMany();
  const [totalRankData, backRankData, frontRankData] = await Promise.all([
    getRank([5, 6, 7], 1, 10),
    getRank([5], 1, 10),
    getRank([6], 1, 10),
  ]);

  return (
    <>
      <MainRanks
        allRanks={[
          { rankData: totalRankData, rankName: "종합 순위", link: "/rank/all" },
          { rankData: frontRankData, rankName: "프론트엔드 순위", link: "/rank/front-end" },
          { rankData: backRankData, rankName: "백엔드 순위", link: "/rank/back-end" },
        ]}
      />
    </>
  );
}

// const Comp = styled.div`
//   color: tomato;
// `;
