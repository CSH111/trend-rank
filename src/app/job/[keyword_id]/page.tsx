import React from "react";
import { pr } from "../../../../PrismaClient";

const page = async (props: { params: { keyword_id: string } }) => {
  console.log(props);
  const keywordId = +props.params.keyword_id;

  const data = await pr.refined_keywords.findFirst({
    where: { id: keywordId },
    include: {
      refined_keywords_on_job_url: {
        include: { job_urls: true },
        take: 30,
        orderBy: { job_url_id: "desc" },
      },
    },
  });
  // await pr.job_urls.findMany({take:30, include:{refined_keywords_on_job_url:},where:{refined_keywords_on_job_url:{every:{refined_keyword_id:keywordId}}}})
  console.log("data: ", data?.refined_keywords_on_job_url[0]);
  // return <div>d</div>;
  return (
    <div>
      <div>{data?.name}</div>
      <div>
        {data?.refined_keywords_on_job_url.map((d) => {
          return (
            <div>
              <a href={d.job_urls.url} target={"_blank"}>
                {d.job_urls.url}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
