import { getAllJobCount, getRank, getRecentReportDate } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";

import { PageContainer, RankLoader, RankPageDesc, RankTitle } from "../components";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/rank/all?page=1");
  }

  const [recentReportDate, allJobCount, data] = await Promise.all([
    getRecentReportDate(),
    getAllJobCount(),
    getRank([5, 6, 7], +props.searchParams.page),
  ]);
  return (
    <>
      <PageContainer>
        <RankTitle title={"종합 순위"} />
        <RankPageDesc allJobCount={allJobCount} reportDate={recentReportDate ?? new Date()} />
        <RankLoader rankData={data} />
      </PageContainer>
    </>
  );
};

export default page;
