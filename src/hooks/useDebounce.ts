import { useEffect, useState } from "react";

const useDebounce = (inputValue: string, timeout = 300) => {
  const [value, setValue] = useState("");
  const [debounceContinuing, setDebounceContinuing] = useState(false);
  useEffect(() => {
    setDebounceContinuing(true);
    const timer = setTimeout(() => {
      setValue(inputValue);
      setDebounceContinuing(false);
    }, timeout);
    return () => clearTimeout(timer);
  }, [inputValue, timeout]);

  return { value, debounceContinuing };
};

export default useDebounce;
