import { pr } from "../../PrismaClient";

export default async function getJob(keywordId: number, page: number, amount = 30) {
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
        // skip: (page - 1) * amount,
        orderBy: { job_url_id: "desc" },
      },
    },
  });

  return {
    ...keywordData,
    date: dateRow,
    jobCount: keywordData?.refined_keywords_on_job_url.length || 0,
  };
}
