"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.set("query", inputValue);
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

  return {
    inputRef,
    inputValue,
    setInputValue,
    handleInputChange,
    handleSubmit,
  };
};
