import { getRank } from "@/serverActions";
import React from "react";
import { RankList } from "../components";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  const data = await getRank([5], +props.searchParams.page);
  return (
    <div>
      <RankLoader rankData={data} />
    </div>
  );
};

export default page;
