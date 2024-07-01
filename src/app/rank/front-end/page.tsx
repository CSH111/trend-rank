import { Devider, Footer } from "@/components";
import { getAllJobCount, getRank, getRecentReportDate } from "@/serverActions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageContainer, RankPageDesc, RankTitle } from "../components";
import RankLoader from "../components/RankLoader";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: "devstacktrend - 프론트엔드 채용 트렌드",
    description: "프론트엔드 개발자 채용 트렌드 키워드 순위",
  };
}

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
