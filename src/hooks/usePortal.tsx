import React, { ReactElement, useEffect, useState } from "react";
import ReactDom, { createPortal } from "react-dom";

function usePortal(destinationId: string) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Portal = ({ children }: { children: ReactElement }) => {
    if (typeof window === "undefined") return <></>;

    return mounted ? (
      createPortal(children, document.getElementById(destinationId) as HTMLElement)
    ) : (
      <></>
    );
  };

  return Portal;
}

export default usePortal;
