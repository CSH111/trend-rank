import { getJob } from "@/serverActions";
import React from "react";
import { JobListLoader, JobPageContainer, JobTableDesc, JobTableHeader } from "../components";

const page = async (props: { params: { keyword_id: string }; searchParams: any }) => {
  const keywordId = +props.params.keyword_id;
  const data = await getJob(keywordId, +props.searchParams.page);

  return (
    <JobPageContainer>
      <JobTableHeader refind_keyword_name={data?.name ?? ""} />
      <JobTableDesc
        keywordName={data?.name ?? ""}
        date={data.date?.date ?? new Date()}
        jobCount={data.jobCount}
      />
      <JobListLoader jobData={data} />
    </JobPageContainer>
  );
};

export default page;
