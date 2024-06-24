import { getAllJobCount, getRank, getRecentReportDate } from "@/serverActions";
import { redirect } from "next/navigation";
import { PageContainer, RankPageDesc, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";

const page = async (props: any) => {
  if (!props.searchParams.page) {
    redirect("/rank/front-end?page=1");
  }

  const [reportDate, allJobCount, data] = await Promise.all([
    getRecentReportDate(),
    getAllJobCount(),
    getRank([6], +props.searchParams.page),
  ]);

  return (
    <div>
      <PageContainer>
        <RankTitle title={"프론트엔드 순위"} />
        <RankPageDesc allJobCount={allJobCount} reportDate={reportDate ?? new Date()} />
        <RankLoader rankData={data} />
      </PageContainer>
    </div>
  );
};

export default page;
