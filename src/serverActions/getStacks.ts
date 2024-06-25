import { pr } from "../../PrismaClient";

export default async function getStacks(searchValue: string) {
  const result = await pr.refined_keywords.findMany({
    where: { name: { startsWith: searchValue } },
  });

  return result;
}
