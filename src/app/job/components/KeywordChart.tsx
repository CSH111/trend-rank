"use client";

import { getKeywordCounts } from "@/serverActions";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
import { styled } from "styled-components";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
];

const KeywordChart = (props: { data: Awaited<ReturnType<typeof getKeywordCounts>> }) => {
  return (
    <Container>
      <ResponsiveContainer minWidth={300} width={"65%"} height={300}>
        <BarChart
          barSize={35}
          // width={500}
          // height={300}
          data={props.data.map((d) => {
            return { name: d.created_at.toISOString().split("T")[0], count: d.count };
          })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="count"
            width={20}
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default KeywordChart;

const Container = styled.div`
  display: flex;
  align-items: center;
  .recharts-responsive-container {
    margin: 0 auto;
    padding: 20px;

    .recharts-wrapper {
      font-size: 1.6rem;
    }
  }
`;
