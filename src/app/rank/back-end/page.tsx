import { Devider, Footer } from "@/components";
import { getAllJobCount, getRank, getRecentReportDate } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";
import { PageContainer, RankPageDesc, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: "devstacktrend - 백엔드 채용 트렌드",
    description: "백엔드 개발자 채용 트렌드 키워드 순위",
  };
}

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
    <>
      <PageContainer>
        <RankTitle title={"백엔드 순위"} />
        <Devider />
        <RankPageDesc allJobCount={allJobCount} reportDate={reportDate ?? new Date()} />
        <RankLoader rankData={data} />
      </PageContainer>
      <Footer />
    </>
  );
};

export default page;
