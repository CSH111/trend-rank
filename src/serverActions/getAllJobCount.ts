import { pr } from "../../PrismaClient";

export default async function getAllJobCount(date?: Date) {
  const recentReportDate = await pr.report_dates.findFirst({
    orderBy: { date: "desc" },
    where: { is_active: 1 },
  });

  const count = await pr.job_urls.count({
    where: { report_date_id: recentReportDate?.id },
  });

  return count;
}
