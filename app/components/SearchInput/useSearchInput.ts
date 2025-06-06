"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const params = new URLSearchParams(searchParams);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    params.set("query", inputValue);
    params.delete("category");
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

  // TODO: reset input value when changing category or genre

  return {
    inputRef,
    inputValue,
    setInputValue,
    handleInputChange,
    handleSubmit,
    handleClear,
  };
};
