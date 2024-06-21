import { pr } from "../../PrismaClient";

export default async function getRank(groupId: number[], page: number, amount = 30) {
  const recentReportDate = await pr.report_dates
    .findFirst({ orderBy: { id: "desc" } })
    .then((rdd) => rdd?.date);
  const oneDay = 3600000 * 24;
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
      refined_keywords: {
        is_active: 1,
        // refined_keywords_on_keyword_groups: { every: { keyword_group_id: { in: [...groupId] } } },
        refined_keywords_on_keyword_groups: { some: { keyword_group_id: { in: [...groupId] } } },
      },
      created_at: {
        gte: recentReportDate,
        lte: new Date((recentReportDate?.getTime() ?? 0) + oneDay),
      },
    },
  });
  return data.map((d) => ({
    count: d.count,
    name: d.refined_keywords.name,
    keywordId: d.refined_keyword_id,
  }));
}
