"use client";
import Image from "next/image";
import { useState, ComponentProps } from "react";

const ImageComp = (props: ComponentProps<typeof Image>) => {
  const [isError, setIsError] = useState(false);
  if (isError) {
    return <Image {...props} src="/next.svg" />;
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
