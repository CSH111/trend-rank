import { pr } from "../../PrismaClient";

export default async function getKeywordWithId(keywordId: number) {
  const keyword = await pr.refined_keywords.findFirst({
    where: { id: keywordId },
  });
  return keyword;
}
