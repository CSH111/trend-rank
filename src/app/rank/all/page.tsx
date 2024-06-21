import { getRank } from "@/serverActions";
import React from "react";

import { PageContainer, RankLoader, RankTitle } from "../components";

const page = async (props: any) => {
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
