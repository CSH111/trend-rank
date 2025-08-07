import { Devider, Footer } from "@/components";
import { getJob, getAllJobCount, getKeywordCounts, getKeywordWithId } from "@/serverActions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import {
  JobListLoader,
  JobPageContainer,
  JobTableDesc,
  JobPageHeader,
  KeywordChart,
  SectionTitle,
} from "../components";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const keyword = await getKeywordWithId(+params.keyword_id);
  keyword?.name;
  return {
    title: `devstacktrend - ${keyword?.name} 채용 트렌드`,
    description: `${keyword?.name} 개발자 채용 트렌드 및 채용공고 모음`,
  };
}

const page = async (props: { params: { keyword_id: string }; searchParams: any }) => {
  if (!props.searchParams.page) {
    redirect(`/job/${props.params.keyword_id}?page=1`);
  }

  const keywordId = +props.params.keyword_id;
  const [data, keywordCounts] = await Promise.all([
    getJob({
      keywordId,
      page: +props.searchParams.page,
      amount: 10,
    }),
    getKeywordCounts(keywordId),
  ]);
  return (
    <>
      <JobPageContainer>
        <JobPageHeader refind_keyword_name={data?.name ?? ""} />
        <Devider />
        <SectionTitle>공고수 변화</SectionTitle>
        <KeywordChart data={keywordCounts} />
        <SectionTitle>채용 공고 확인</SectionTitle>
        <JobTableDesc
          keywordName={data?.name ?? ""}
          date={data.date?.date ?? new Date()}
          jobCount={data.jobCount}
        />
        <JobListLoader jobData={data} />
      </JobPageContainer>
      <Footer />
    </>
  );
};

export default page;
