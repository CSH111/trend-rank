import { pr } from "../../PrismaClient";

export default async function getJob(args: {
  keywordId: number;
  page: number;
  amount?: number; //30,
  platformId?: number;
}) {
  const { keywordId, page, amount = 30, platformId = 0 } = args;
  const dateRow = await pr.report_dates.findFirst({
    orderBy: { id: "desc" },
    where: { is_active: 1 },
  });
  const keywordData = await pr.refined_keywords.findFirst({
    where: { id: keywordId },
    include: {
      refined_keywords_on_job_url: {
        where: { job_urls: { report_date_id: dateRow?.id } },
        include: { job_urls: true },
        take: amount * page,
        orderBy: { job_url_id: "desc" },
      },
    },
  });

  const count = await pr.refined_keywords_on_job_url.count({
    where: {
      refined_keyword_id: keywordId,
      job_urls: {
        report_date_id: dateRow?.id || 0,
      },
    },
  });
  return {
    ...keywordData,
    date: dateRow,
    jobCount: count || 0,
  };
}
