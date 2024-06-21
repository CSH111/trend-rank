import { getRank } from "@/serverActions";
import { redirect } from "next/navigation";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/");
  }

  const data = await getRank([6], +props.searchParams.page);
  return (
    <div>
      <RankLoader rankData={data} />
    </div>
  );
};

export default page;
