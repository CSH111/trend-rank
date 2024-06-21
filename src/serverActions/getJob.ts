import { pr } from "../../PrismaClient";

export default async function getJob(keywordId: number, page: number, amount = 30) {
  const countFn = pr.refined_keywords_on_job_url.count({
    where: { refined_keyword_id: keywordId },
  });
  const dateFn = pr.report_dates.findFirst({ orderBy: { id: "desc" } });
  const dataFn = pr.refined_keywords.findFirst({
    where: { id: keywordId },
    include: {
      refined_keywords_on_job_url: {
        include: { job_urls: true },
        take: amount * page,
        // skip: (page - 1) * amount,
        orderBy: { job_url_id: "desc" },
      },
    },
  });
  const [count, date, data] = await Promise.all([countFn, dateFn, dataFn]);

  return { ...data, date, jobCount: count };
}
