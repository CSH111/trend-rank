"use client";
import { useDebounce } from "@/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Search } from "@mui/icons-material";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [savedInputValue, setSavedInputValue] = useState("");
  const router = useRouter();
  const debSavedInputValue = useDebounce(savedInputValue);
  const [results, setResults] = useState<{ id: number; name: string }[] | null>(null);
  const [keyboardTargetIdx, setKeyboardTargetIdx] = useState<null | number>(null);
  useEffect(() => {
    (async () => {
      setKeyboardTargetIdx(null);
      if (debSavedInputValue === "") {
        setResults(null);
        return;
      }
      const res = await axios.get(`/api/stack?search=${debSavedInputValue}`);
      setResults(res.data);
    })();
  }, [debSavedInputValue]);

  const [focused, setFocused] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = () => {
    setFocused(true);
    setIsPopupOpened(true);
  };
  const onBlur = () => {};

  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (inputRef.current?.contains(e.target as any)) {
      } else {
        setResults(null);
      }
    });
  }, []);
  useEffect(() => {
    if (!results || !results.length) {
      return;
    }
    if (keyboardTargetIdx === null) {
      setInputValue(savedInputValue);
      return;
    }

    setInputValue(results[keyboardTargetIdx]?.name ?? "");
  }, [keyboardTargetIdx]);

  const submitSearchResult = (targetId: number | string) => {
    setResults(null);
    inputRef.current?.blur();
    router.push(`/job/${targetId}`);
    setInputValue("");
    setSavedInputValue("");
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e: any) => {
    if (e.code !== "ArrowDown" && e.code !== "ArrowUp" && e.code !== "Enter") {
      setTimeout(() => {
        setSavedInputValue(e.target.value);
      }, 0);
    }
    if (!results || results.length < 1) {
      return;
    }
    if (e.code === "ArrowDown") {
      setKeyboardTargetIdx((idx) => {
        if (idx === null) {
          return 0;
        }
        if (idx === results.length - 1) {
          return null;
        }
        return idx + 1;
      });
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      setKeyboardTargetIdx((idx) => {
        if (idx === null) {
          return results.length - 1;
        }
        if (idx === 0) {
          return null;
        }
        return idx - 1;
      });
    }
    if (e.code === "Enter") {
      submitSearchResult(results[keyboardTargetIdx === null ? 0 : keyboardTargetIdx].id);
      return;
    }
  };
  const handleClickResult: any = (e: any) => {
    const targetIdx = e.target.value;

    setInputValue(results?.find((r) => r.id === results[targetIdx].id)?.name ?? "");
    submitSearchResult(results?.[targetIdx]?.id ?? 0);
  };
  return (
    <Container $isPopupOpened={isPopupOpened}>
      <div className="input-box" tabIndex={0}>
        <Search className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={"키워드 검색"}
        />
      </div>
      <ul>
        {results?.map((d: any, idx) => {
          return (
            <li
              key={d.name}
              value={idx}
              className={idx === keyboardTargetIdx ? "tg" : ""}
              onClick={handleClickResult}
            >
              {d.name}
            </li>
          );
        })}
        {results?.length === 0 && focused && (
          <li className="no-data"> 수집중인 키워드가 없습니다.</li>
        )}
      </ul>
    </Container>
  );
}

export default SearchBar;

const Container = styled.div<{ $isPopupOpened: boolean }>`
  position: relative;
  .input-box {
    position: relative;
    display: flex;
    align-items: center;
    .search-icon {
      color: white;
      position: absolute;
      margin: 0 0.5rem;
    }
    input {
      /* padding-left: 1.6rem; */
      background-color: #b8b8b853;
      padding: 0.5rem 0.5rem 0.5rem 2.2rem;
      border-radius: 0.5rem;
      caret-color: white;
      border: none;
      outline: none;
      width: 12.5rem;
      box-sizing: border-box;
      height: 3rem;
      transition: width 0.3s;
      font-size: 1.25rem;
      color: white;
      &:focus {
        width: 22rem;
        background-color: #e6e6e66e;
      }
      &:hover {
        background-color: #e6e6e66e;
      }
      &::placeholder {
        color: #e6e6e6c5;
        font-size: 1rem;
      }
    }
  }

  ul {
    visibility: ${(p) => (p.$isPopupOpened ? "visible" : " hidden")};
    background-color: white;
    position: absolute;
    margin-top: 0.5rem;
    right: 0;
    color: white;
    background-color: #000000a6;
    max-height: 20rem;
    overflow-y: auto;
    li {
      font-size: 1.25rem;
      cursor: pointer;
      height: 3rem;
      width: 22rem;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      &:hover:not(.no-data) {
        background-color: #9c9c9cc5;
      }
      &.tg:not(.no-data) {
        background-color: #929292c5;
      }
    }
  }
`;
