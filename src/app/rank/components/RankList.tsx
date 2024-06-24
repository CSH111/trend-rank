"use client";

import React from "react";
import ImageComp from "./ImageComp";
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

import { FiExternalLink } from "react-icons/fi";

const RankList = (props: {
  small?: boolean;
  rankData: { count: number; name: string; keywordId: number }[];
}) => {
  const imageServerURL = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;
  if (!props.rankData || !props.rankData.length || !props.rankData[0]) {
    return <></>;
  }
  return (
    <>
      {/* <CustomizedTables /> */}
      <TableContainer
        component={Paper}
        className="table-container"
        sx={{ display: "flex", width: "auto" }}
      >
        <Table aria-label="customized table">
          <colgroup>
            <col style={{ width: props.small ? "20%" : "15%" }} />
            <col style={{ width: props.small ? "30%" : "35%" }} />
            <col style={{ width: props.small ? "30%" : "35%" }} />
            <col style={{ width: props.small ? "20%" : "15%" }} />
          </colgroup>
          <TableHead>
            <StyledTableRow className={props.small ? "small" : ""}>
              <StyledTableCell
                align="center"

                // sx={{ borderRadius: "10px 0 0 0" }}
              >
                순위
              </StyledTableCell>
              <StyledTableCell align="center">기술명</StyledTableCell>
              <StyledTableCell
                align="center"

                // sx={{ borderRadius: "0 10px 0 0" }}
              >
                공고수
              </StyledTableCell>
              <StyledTableCell align="center">상세</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.rankData.map((rank, idx) => (
              <StyledTableRow key={rank.name} className={props.small ? "small" : ""}>
                <StyledTableCell component="th" scope="row" align="center">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  // sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div className="img-name-box">
                    <ImageComp
                      width={40}
                      height={40}
                      alt="tech_img"
                      src={`${imageServerURL}/images/tech/${rank.name
                        .replaceAll(" ", "-")
                        .replaceAll("/", "-")}.png`}
                    />
                    <div>{rank.name}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{rank.count.toLocaleString()}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link href={`/job/${rank.keywordId}?page=1`}>이동</Link>
                  <>{` `}</>
                  <Link href={`/job/${rank.keywordId}?page=1`} target={"_blank"}>
                    <FiExternalLink />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// const RankItem = () => {

// }

export default RankList;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "1.6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
  },
  [`& .img-name-box`]: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
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
  "&.small": {
    ["th"]: {
      fontSize: "1.25rem",
      // padding: "0.75rem",
    },
    ["td"]: {
      fontSize: "1.25rem",
      padding: "0.75rem",
    },
  },
  // "&:hover": {
  //   backgroundColor: "#afafafd7",
  // },
}));
