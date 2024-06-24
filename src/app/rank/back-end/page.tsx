import { getAllJobCount, getRank, getRecentReportDate } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";
import { PageContainer, RankPageDesc, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/rank/back-end?page=1");
  }

  const [reportDate, allJobCount, data] = await Promise.all([
    getRecentReportDate(),
    getAllJobCount(),
    getRank([5], +props.searchParams.page),
  ]);

  return (
    <div>
      <PageContainer>
        <RankTitle title={"백엔드 순위"} />
        <RankPageDesc allJobCount={allJobCount} reportDate={reportDate ?? new Date()} />
        <RankLoader rankData={data} />
      </PageContainer>
    </div>
  );
};

export default page;
