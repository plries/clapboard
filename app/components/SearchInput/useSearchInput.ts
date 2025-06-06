"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const [previousSearchParams, setPreviousSearchParams] = useState(searchParams);

  const params = new URLSearchParams(searchParams);

  const previousParams = {
    category: previousSearchParams.get("category"),
    query: previousSearchParams.get("query"),
    with_genres: previousSearchParams.get("with_genres"),
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    params.set("query", inputValue);
    params.delete("category");
    params.delete("with_genres");
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setInputValue("");
    params.delete("query");
    params.delete("with_genres");
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [inputValue]);

  useEffect(() => {
    setPreviousSearchParams(searchParams);

    const newParams = {
      category: searchParams.get("category"),
      query: searchParams.get("query"),
      with_genres: searchParams.get("with_genres"),
    };

    if (
      (previousParams.category !== newParams.category ||
      previousParams.with_genres !== newParams.with_genres)
      && previousParams.query !== null
    ) {
      console.log("resetting input value");
      setInputValue("");
    }

    previousParams.category = newParams.category;
    previousParams.with_genres = newParams.with_genres;
  }, [searchParams]);

  return {
    inputRef,
    inputValue,
    setInputValue,
    handleInputChange,
    handleSubmit,
    handleClear,
  };
};
