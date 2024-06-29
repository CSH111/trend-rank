"use client";

import { RankList } from "@/app/rank/components";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";
import { styled } from "styled-components";

const MainRanks = (props: {
  allRanks: {
    rankData: { count: number; name: string; keywordId: number }[];
    rankName: string;
    link: string;
    rankDesc?: string;
  }[];
}) => {
  const theme = useTheme();
  const isUnderMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container $isUnderMd={isUnderMd}>
      {props.allRanks.map((rd) => {
        return (
          <div className="title-and-table" key={rd.rankName}>
            <div className="title-and-link">
              <h3>{rd.rankName}</h3>
              <div className="links">
                <Link href={rd.link}>더보기</Link>
                <Link href={rd.link} target={"_blank"} className="icon-link">
                  <FiExternalLink />
                </Link>
              </div>
            </div>
            <RankList small={true} rankData={rd.rankData} />
          </div>
        );
      })}
    </Container>
  );
};

export default MainRanks;

const Container = styled.div<{ $isUnderMd: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$isUnderMd ? "auto" : "1fr 1fr")};
  gap: 3rem;
  .title-and-table {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title-and-link {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      h3 {
        font-size: 2rem;
      }
      .links {
        align-self: flex-end;
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        .icon-link {
          font-size: 1.1rem;
        }
      }
      a {
      }
    }
    .table-container {
    }
  }
`;
