"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ImageComp from "./ImageComp";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

import { FiExternalLink } from "react-icons/fi";

const RankList = (props: { rankData: { count: number; name: string; keywordId: number }[] }) => {
  const imageServerURL = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;
  const router = useRouter();
  if (!props.rankData || !props.rankData.length || !props.rankData[0]) {
    return <></>;
  }
  return (
    <>
      {/* <CustomizedTables /> */}
      <TableContainer component={Paper} sx={{ display: "flex", width: "auto" }}>
        <Table aria-label="customized table">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rankData.map((rank, idx) => (
              <StyledTableRow key={rank.name}>
                <StyledTableCell component="th" scope="row" align="center">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ImageComp
                    width={40}
                    height={40}
                    alt="tech_img"
                    src={`${imageServerURL}/images/tech/${rank.name
                      .replaceAll(" ", "-")
                      .replaceAll("/", "-")}.png`}
                  />
                  {rank.name}
                </StyledTableCell>
                <StyledTableCell align="right">{rank.count.toLocaleString()}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link href={`/job/${rank.keywordId}`}>이동</Link>
                  <>{` `}</>
                  <Link href={`/job/${rank.keywordId}`} target={"_blank"}>
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
