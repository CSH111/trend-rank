import { getRank } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";

import { PageContainer, RankLoader, RankTitle } from "../components";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/");
  }

  const data = await getRank([5, 6, 7], +props.searchParams.page);
  return (
    <>
      <PageContainer>
        <RankTitle title={"종합 순위"} />
        <RankLoader rankData={data} />
      </PageContainer>
    </>
  );
};

export default page;
