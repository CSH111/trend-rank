"use client";

import { getKeywordCounts } from "@/serverActions";
import { useMediaQuery, useTheme } from "@mui/material";
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

const KeywordChart = (props: { data: Awaited<ReturnType<typeof getKeywordCounts>> }) => {
  const theme = useTheme();
  const isUnderMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container>
      <ResponsiveContainer minWidth={300} width={"65%"} height={300}>
        <BarChart
          barSize={isUnderMd ? 20 : 35}
          // width={500}
          // height={300}
          data={props.data.map((d) => {
            return { name: d.report_dates?.date?.toISOString().split("T")[0], count: d.count };
          })}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[
              (min: number) => Math.floor(min * 0.9 * 0.01) * 100,
              (max: number) => Math.ceil(max * 1.025 * 0.01) * 100,
            ]}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="count"
            width={20}
            fill="#ff9f5f"
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
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
      font-size: 1.4rem;
    }
  }
`;
