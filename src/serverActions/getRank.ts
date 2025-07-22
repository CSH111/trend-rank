import { pr } from "../../PrismaClient";

export default async function getRank(groupId: number[], page: number, amount = 30) {
  const recentReport = await pr.report_dates.findFirst({
    orderBy: { date: "desc" },
    where: { is_active: 1 },
  });
  const oneDay = 3600000 * 24;
  const recentReportId = recentReport?.id;

  const data = await pr.keyword_counts.findMany({
    take: amount * page,
    // skip: (page - 1) * amount,
    include: {
      refined_keywords: {
        include: {
          refined_keywords_on_keyword_groups: {
            include: { keyword_groups: true },
          },
        },
      },
    },
    orderBy: { count: "desc" },
    where: {
      report_date_id: recentReportId,
      refined_keywords: {
        is_active: 1,
        // refined_keywords_on_keyword_groups: { every: { keyword_group_id: { in: [...groupId] } } },
        refined_keywords_on_keyword_groups: { some: { keyword_group_id: { in: [...groupId] } } },
      },
      // created_at: {
      //   gte: recentReportDate,
      //   lte: new Date((recentReportDate?.getTime() ?? 0) + oneDay),
      // },
    },
  });
  return data.map((d) => ({
    count: d.count,
    name: d.refined_keywords.name,
    keywordId: d.refined_keyword_id,
  }));
}
