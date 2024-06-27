import { Devider, Footer } from "@/components";
import { getJob, getAllJobCount, getKeywordCounts } from "@/serverActions";
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

const page = async (props: { params: { keyword_id: string }; searchParams: any }) => {
  if (!props.searchParams.page) {
    redirect(`/job/${props.params.keyword_id}?page=1`);
  }

  const keywordId = +props.params.keyword_id;
  const [data, keywordCounts] = await Promise.all([
    getJob(keywordId, +props.searchParams.page),
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
