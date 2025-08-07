"use client";

import { getJob } from "@/serverActions";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import Link from "next/link";
import { getTitleFromUrl } from "@/utils/getTitleFromUrl";
import JobItem from "./JobItem";

const JobList = (props: { jobData: Awaited<ReturnType<typeof getJob>> }) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{ display: "flex", width: "auto" }}>
        <Table aria-label="customized table">
          <colgroup>
            {/* <col style={{ width: "10%" }} />
            <col style={{ width: "60%" }} />
            <col style={{ width: "30%" }} /> */}
          </colgroup>
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"

                // sx={{ borderRadius: "10px 0 0 0" }}
              >
                순번
              </StyledTableCell>
              <StyledTableCell align="center">공고 링크</StyledTableCell>
              <StyledTableCell
                align="center"

                // sx={{ borderRadius: "0 10px 0 0" }}
              >
                수집일
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.jobData?.refined_keywords_on_job_url?.map((urlData, idx) => (
              <StyledTableRow key={urlData.job_url_id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  // sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <JobItem url={urlData.job_urls.url} key={urlData.job_urls.url} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.jobData.date?.date?.toISOString()?.split("T")?.[0]}
                  {/* {urlData.job_urls.created_at.toISOString().split("T")[0]} */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JobList;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "1.6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
  },
  ["a"]: {
    wordBreak: "break-all",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // "&:hover": {
  //   backgroundColor: "#afafafd7",
  // },
}));
