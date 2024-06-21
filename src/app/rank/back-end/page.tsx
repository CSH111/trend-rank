import { getRank } from "@/serverActions";
import { redirect } from "next/navigation";
import React from "react";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/");
  }

  const data = await getRank([5], +props.searchParams.page);
  return (
    <div>
      <RankLoader rankData={data} />
    </div>
  );
};

export default page;
