import { pr } from "../../PrismaClient";

export default async function getRecentReportDate() {
  const recentReportDate = await pr.report_dates.findFirst({ orderBy: { id: "desc" } });
  return recentReportDate?.date;
}
