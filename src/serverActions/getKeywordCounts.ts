import { pr } from "../../PrismaClient";

export default async function getKeywordCounts(keywordId: number) {
  const counts = await pr.keyword_counts.findMany({
    where: { refined_keyword_id: keywordId },
    orderBy: { id: "desc" },
    include: { report_dates: { where: { is_active: 1 } } },
    take: 4,
  });
  counts?.reverse();
  return counts;
}
