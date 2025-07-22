import { pr } from "../../PrismaClient";

export default async function getRecentReportDate() {
  const recentReportDate = await pr.report_dates.findFirst({
    orderBy: { date: "desc" },
    where: { is_active: 1 },
  });
  return recentReportDate?.date;
}
