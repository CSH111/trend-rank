import { pr } from "../../PrismaClient";

export default async function getJobCountOnKeyword(keywordId: number, date?: Date) {
  const recentReportDate = await pr.report_dates.findFirst({ orderBy: { id: "desc" } });
  const targetDate = date ? date : recentReportDate?.date;
  const targetEndDate = (targetDate?.getTime() ?? 0) + 3600 * 1000 * 24;

  const count = await pr.url_count_dates.count({
    where: { count_date: { gte: recentReportDate?.date, lt: new Date(targetEndDate) } },
  });

  return count;
}
