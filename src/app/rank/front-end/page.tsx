import { Devider, Footer } from "@/components";
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
    <>
      <PageContainer>
        <RankTitle title={"프론트엔드 순위"} />
        <Devider />
        <RankPageDesc allJobCount={allJobCount} reportDate={reportDate ?? new Date()} />
        <RankLoader rankData={data} />
      </PageContainer>
      <Footer />
    </>
  );
};

export default page;
