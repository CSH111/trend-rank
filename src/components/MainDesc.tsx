"use client";

import { styled } from "styled-components";

function MainDesc(props: { recentDate: Date; totalJobCount: number }) {
  return (
    <Container>
      <p>
        {props.recentDate.toISOString().split("T")[0]} 기준 {props.totalJobCount} 개의 채용 공고를
        분석한 결과를 제공합니다.
      </p>
    </Container>
  );
}

const Container = styled.div`
  p {
    font-size: 1.6rem;
  }
`;
export default MainDesc;
