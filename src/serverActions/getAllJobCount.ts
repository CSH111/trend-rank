import { pr } from "../../PrismaClient";

export default async function getAllJobCount(date?: Date) {
  const recentReportDate = await pr.report_dates.findFirst({ orderBy: { id: "desc" } });
  const targetDate = date ? date : recentReportDate?.date;
  const targetEndDate = (targetDate?.getTime() ?? 0) + 3600 * 1000 * 24;
  const count = await pr.job_urls.count({
    where: { created_at: { gte: recentReportDate?.date, lt: new Date(targetEndDate) } },
  });
  return count;
}
