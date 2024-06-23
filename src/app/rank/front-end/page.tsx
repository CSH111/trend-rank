import { getRank } from "@/serverActions";
import { redirect } from "next/navigation";
import { PageContainer, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/rank/front-end?page=1");
  }

  const data = await getRank([6], +props.searchParams.page);
  return (
    <div>
      <PageContainer>
        <RankTitle title={"프론트엔드 순위"} />
        <RankLoader rankData={data} />
      </PageContainer>
    </div>
  );
};

export default page;
