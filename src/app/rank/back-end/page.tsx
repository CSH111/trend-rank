import { getRank } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";
import { PageContainer, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/rank/back-end?page=1");
  }

  const data = await getRank([5], +props.searchParams.page);
  return (
    <div>
      <PageContainer>
        <RankTitle title={"백엔드 순위"} />
        <RankLoader rankData={data} />
      </PageContainer>
    </div>
  );
};

export default page;
