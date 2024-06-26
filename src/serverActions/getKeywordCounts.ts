import { pr } from "../../PrismaClient";

export default async function getKeywordCounts(keywordId: number) {
  const counts = await pr.keyword_counts.findMany({
    where: { refined_keyword_id: keywordId },
    orderBy: { created_at: "asc" },
    take: 4,
  });
  return counts;
}
