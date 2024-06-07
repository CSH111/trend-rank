import React from "react";
import { pr } from "../../../../PrismaClient";

async function getOne(groupId: number, page: number, amount = 30) {
  const recentReportDate = await pr.report_dates
    .findFirst({ orderBy: { id: "desc" } })
    .then((rdd) => rdd?.date);
  const oneDay = 3600000 * 24;
  const data = await pr.keyword_counts.findMany({
    take: amount,
    skip: (page - 1) * amount,
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
        refined_keywords_on_keyword_groups: { every: { keyword_group_id: groupId } },
      },

      created_at: {
        gte: recentReportDate,
        lte: new Date((recentReportDate?.getTime() ?? 0) + oneDay),
      },
    },
  });
  return data;
}

const page = async () => {
  const data = await getOne(6, 1);
  console.log("data: ", data);
  console.log("as");

  return (
    <div>
      <div></div>
      {data.map((d) => {
        return (
          <div>
            <div>{d.count}</div>
            <div>{d.refined_keywords.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
