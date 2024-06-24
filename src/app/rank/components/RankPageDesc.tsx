"use client";

import { styled } from "styled-components";

function RankPageDesc(props: { allJobCount: number; reportDate: Date }) {
  return (
    <Container>
      <p className="desc-1">{props.allJobCount} 개의 채용공고를 분석한 결과입니다.</p>
      <p className="desc-2">{props.reportDate.toISOString().split("T")[0]} 기준</p>
    </Container>
  );
}

export default RankPageDesc;

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    font-size: 1.6rem;
  }
  p.desc-1 {
  }
  p.desc-2 {
  }
`;
