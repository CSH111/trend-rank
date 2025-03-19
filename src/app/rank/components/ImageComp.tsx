"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, ComponentProps } from "react";

const DefaultImageBlock = styled.div<{ $width?: number; $height?: number }>`
  background-color: #eaeaea;
  width: ${(p) => (p.$width ? `${p.$width}px` : "100%")};
  height: ${(p) => (p.$height ? `${p.$height}px` : "100%")};
`;

const ImageComp = (props: ComponentProps<typeof Image>) => {
  const [isError, setIsError] = useState(false);
  if (isError) {
    // return <Image {...props} src="/next.svg" />;
    return <DefaultImageBlock $width={props.width as number} $height={props.width as number} />;
  }
  return (
    <Image
      {...props}
      onError={() => {
        setIsError(true);
      }}
    />
  );
};

export default ImageComp;
