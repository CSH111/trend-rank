import {
  Devider,
  Footer,
  LoadingIcon,
  MainDesc,
  MainPageLayout,
  MainRanks,
  MainTitle,
} from "@/components";
import { getRank, getAllJobCount, getRecentReportDate } from "@/serverActions";
import Image from "next/image";
import styled from "styled-components";
import { pr } from "../../PrismaClient";
import Comp from "../styles/Comp1";
import { RankList } from "./rank/components";

export default async function Home() {
  const [totalRankData, backRankData, frontRankData, jobCount, recentReportDate] =
    await Promise.all([
      getRank([5, 6, 7], 1, 10),
      getRank([5], 1, 10),
      getRank([6], 1, 10),
      getAllJobCount(),
      getRecentReportDate(),
    ]);

  return (
    <>
      <MainPageLayout>
        <MainTitle />
        <Devider />
        <MainDesc recentDate={recentReportDate ?? new Date()} totalJobCount={jobCount} />
        <MainRanks
          allRanks={[
            { rankData: totalRankData, rankName: "종합 순위", link: "/rank/all" },
            { rankData: frontRankData, rankName: "프론트엔드 순위", link: "/rank/front-end" },
            { rankData: backRankData, rankName: "백엔드 순위", link: "/rank/back-end" },
          ]}
        />
      </MainPageLayout>
      <Footer />
    </>
  );
}

// const Comp = styled.div`
//   color: tomato;
// `;
