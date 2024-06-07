import Image from "next/image";
import styled from "styled-components";
import { pr } from "../../PrismaClient";
import Comp from "../styles/Comp1";

export default async function Home() {
  const result = await pr.keyword_groups.findMany();

  return (
    <main>
      dd
      {result.map((r) => {
        return <div>{r.name}</div>;
      })}
      <Comp>dg</Comp>
    </main>
  );
}

// const Comp = styled.div`
//   color: tomato;
// `;
