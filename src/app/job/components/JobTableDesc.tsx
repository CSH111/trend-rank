"use client";

import { styled } from "styled-components";

const JobTableDesc = (props: { date: Date; jobCount: number; keywordName: string }) => {
  return (
    <Container>
      <p>
        {props.keywordName} 키워드가 포함된 {props.jobCount}개의 채용 공고가 존재합니다.
      </p>
      <p>{props.date.toISOString().split("T")[0]} 기준</p>
    </Container>
  );
};
export default JobTableDesc;

const Container = styled.div`
  p {
    font-size: 1.6rem;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;
