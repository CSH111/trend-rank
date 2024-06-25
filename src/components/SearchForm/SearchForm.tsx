"use client";

import { Search } from "@mui/icons-material";
import {
  type AutocompleteChangeReason,
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  InputAdornment,
  Popper,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { useDebounce } from "@/hooks";

// import { type Dispatch, type RootState, useMySelector } from "@/store";
// import { booksActions, getBooks } from "@/store/booksSlice";
// import { FilterValue, ParamsKey } from "@/types";
// import { extractAuthorsFromBooks, extractTitlesFromBooks } from "@/utils";

import * as S from "./styles";
import axios from "axios";
import { useRouter } from "next/navigation";

//TODO param set로직 페이지 컴포넌트로 이동, State 객체화

type SearchFormProps = {
  focusOnLoad?: boolean;
};

// type Params = {
//   [key in ParamsKey]?: string;
// };

const SearchForm = ({ focusOnLoad = false }: SearchFormProps) => {
  // const navigate = useNavigate();
  //TODO 에러ui처리
  // const createSearchParamsWithKeys = (params: Params) => createSearchParams(params);
  // const { booksData } = useMySelector((state) => state.books);

  // const dispatch = useDispatch<Dispatch>();

  // const [params, setParams] = useSearchParams();
  // const setFilterParamsWithKey = (params: { [key in ParamsKey]?: FilterValue }) =>
  //   setParams(params);
  // const { filter: filterValue, query } = useMemo(
  //   () => Object.fromEntries(params.entries()),
  //   [params]
  // );
  const router = useRouter();
  const [optionValue, setOptionValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [savedInputValue, setSavedInputValue] = useState("");
  const debouncedSavedInputValue = useDebounce(savedInputValue);
  const [optionApiResults, setOptionApiResults] = useState<any>([]);
  const [options, setOptions] = useState<string[] | null>(null);

  const input = useRef<HTMLInputElement>(null);

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const isNoResult = options !== null && options.length === 0;

  // const defaultParamsForNavigation: Params = {
  //   target: filterValue,
  //   filter: filterValue,
  //   page: "1",
  //   size: "10",
  // };

  const navigateToBooks = (searchValue: string) => {
    // navigate({
    //   pathname: "/books",
    //   search: `?${createSearchParamsWithKeys({
    //     ...defaultParamsForNavigation,
    //     query: searchValue,
    //   })}`,
    // });
  };

  const executeSubmitLogic = (searchValue: string) => {
    // dispatch(booksActions.clear());
    console.log("execute !", searchValue);
    if (!options?.length) {
      return;
    }
    setOptions(null);
    // setInputValue("");
    // setIsPopupOpened(false);
    const target: any = optionApiResults.find((x: any) => x.name === searchValue);
    // console.log("zx: ", zx);
    router.push(`/job/${target ? target.id : optionApiResults?.[0]?.id}`);
  };

  // useEffect(() => {
  //   if (!booksData) {
  //     setOptions(null);
  //     return;
  //   }
  //   switch (filterValue as FilterValue) {
  //     case "title": {
  //       const titles = extractTitlesFromBooks(booksData.documents, inputValue);
  //       setOptions(titles);
  //       break;
  //     }
  //     case "person": {
  //       const authors = extractAuthorsFromBooks(booksData.documents, inputValue);
  //       setOptions(authors);
  //       break;
  //     }
  //   }
  // }, [booksData, filterValue]);

  // useEffect(() => {
  //   if (filterValue) return;
  //   setFilterParamsWithKey({ filter: "title" });
  // }, []);

  // useEffect(() => {
  //   if (!query) return;
  //   setInputValue(query);
  // }, [query]);

  useEffect(() => {
    if (debouncedSavedInputValue === "") return;
    // dispatch(
    //   getBooks({
    //     query: savedInputValue,
    //     target: filterValue as FilterValue,
    //     size: 8,
    //   })
    // );
    (async () => {
      const res = await axios.get(`/api/stack?search=${debouncedSavedInputValue}`);
      console.log(res.data);
      setOptions(res.data.map((d: any) => d.name));
      setOptionApiResults(res.data);
    })();
  }, [debouncedSavedInputValue]);

  useEffect(() => {
    if (inputValue === "") {
      // dispatch(booksActions.clear());
      return;
    }
  }, [inputValue]);

  const handleSubmitWithEnter: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    executeSubmitLogic(inputValue);
  };

  const handleClickResultItem = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason !== "selectOption") return;
    executeSubmitLogic(value ?? "");
  };

  const handleInputChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: string,
    changeReason: AutocompleteInputChangeReason
  ) => {
    setInputValue(value);
    if (changeReason === "input") {
      setSavedInputValue(value);
    }
  };

  const handleHighlightChange = (
    e: React.SyntheticEvent<Element, Event>,
    option: string | null,
    reason: AutocompleteHighlightChangeReason
  ) => {
    if (reason !== "keyboard") return;
    if (!option) {
      setInputValue(savedInputValue);
    }
    setOptionValue(option);
  };

  const handleEnterOnInput: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
  };

  const handlePopupOpen = () => {
    setIsPopupOpened(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpened(false);
  };
  return (
    <S.SytyledForm onSubmit={handleSubmitWithEnter}>
      <Autocomplete
        onOpen={handlePopupOpen}
        onClose={handlePopupClose}
        loading={isNoResult}
        loadingText={"수집중인 키워드가 없습니다."}
        options={options ?? []}
        value={optionValue}
        onChange={handleClickResultItem}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onHighlightChange={handleHighlightChange}
        freeSolo
        includeInputInList={true}
        filterOptions={(val) => val}
        disablePortal={true}
        size="small"
        renderInput={(params) => {
          return (
            <S.TextField
              {...params}
              isPopupOpened={isPopupOpened && options !== null}
              inputRef={input}
              onKeyDown={handleEnterOnInput}
              placeholder="키워드를 검색하세요"
              variant="outlined"
              sx={{ boxShadow: 3 }}
              // autoFocus={Boolean(focusOnLoad)}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
        PaperComponent={(props) => <S.Paper {...props} sx={{ boxShadow: 3 }} />}
        // PopperComponent={(props) => (
        //   <Popper {...props} disablePortal modifiers={[{ name: "zz", enabled: true }]} />
        // )}
      />
    </S.SytyledForm>
  );
};

export default SearchForm;
